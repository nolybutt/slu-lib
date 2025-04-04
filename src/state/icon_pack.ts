import type { Icon as IIcon, IconPack as IIconPack } from '@seelen-ui/types';
import { List } from '../utils/List.ts';
import { createInstanceInvoker, createInstanceOnEvent } from '../utils/State.ts';
import { invoke, SeelenCommand, SeelenEvent } from '../handlers/mod.ts';
import { path } from '@tauri-apps/api';
import { Settings } from './settings/mod.ts';
import { convertFileSrc } from '@tauri-apps/api/core';
import type { UnlistenFn } from '@tauri-apps/api/event';

export interface GetIconArgs {
  path?: string | null;
  umid?: string | null;
}

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetIconPacks]: null;
    [SeelenCommand.GetIcon]: GetIconArgs;
    [SeelenCommand.StateDeleteCachedIcons]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetIconPacks]: IIconPack[];
    [SeelenCommand.GetIcon]: string | null;
    [SeelenCommand.StateDeleteCachedIcons]: void;
  }
  interface PayloadByEvent {
    [SeelenEvent.StateIconPacksChanged]: IIconPack[];
  }
}

export class IconPackList extends List<IIconPack> {
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetIconPacks);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.StateIconPacksChanged);
}

/**
 * Class helper to allow easy use of icon packs
 */
export class IconPackManager {
  private callbacks: Set<() => void> = new Set();
  private unlistenerSettings: UnlistenFn | null = null;
  private unlistenerIcons: UnlistenFn | null = null;

  private static resolveIcon(parent: string, icon: IIcon): IIcon {
    if (typeof icon === 'string') {
      return `${parent}\\${icon}`;
    }
    return {
      light: `${parent}\\${icon.light}`,
      dark: `${parent}\\${icon.dark}`,
      mask: icon.mask ? `${parent}\\${icon.mask}` : null,
    };
  }

  private static resolveIconAsSrc(icon: IIcon): IIcon {
    if (typeof icon === 'string') {
      return convertFileSrc(icon);
    }
    return {
      light: convertFileSrc(icon.light),
      dark: convertFileSrc(icon.dark),
      mask: icon.mask ? convertFileSrc(icon.mask) : null,
    };
  }

  protected constructor(
    protected iconPackPath: string,
    protected _iconPacks: IconPackList,
    protected _actives: string[],
  ) {}

  public get iconPacks(): IconPackList {
    return this._iconPacks;
  }

  public get actives(): string[] {
    return this._actives;
  }

  /**
   * Creates an instance of IconPackManager. This intance will be updated when
   * the list of icon packs or the settings changes, so just having one global instance is enough.
   *
   * @returns A new instance of IconPackManager
   */
  public static async create(): Promise<IconPackManager> {
    const instance = new IconPackManager(
      await path.resolve(await path.appDataDir(), 'icons'),
      await IconPackList.getAsync(),
      (await Settings.getAsync()).inner.iconPacks,
    );

    return instance;
  }

  /**
   * Registers a callback to be invoked when the list of active icon packs changes.
   * This method also sets up listeners to detect changes in the icon pack list and
   * the active icon packs settings. If no callbacks are registered beforehand, the
   * listeners are initialized. When no callbacks remain registered, the listeners are stopped.
   *
   * @param {() => void} cb - The callback to be invoked when the list of active icon packs changes.
   *                          This callback takes no arguments and returns no value.
   * @returns {Promise<UnlistenFn>} A promise that resolves to an `UnlistenFn` function. When invoked,
   *                                this function unregisters the callback and stops listening for changes
   *                                if no other callbacks are registered.
   *
   * @example
   * const manager = await IconPackManager.create();
   * const unlisten = await manager.onChange(() => {
   *   console.log("Icon packs changed: ", manager.actives);
   * });
   *
   * // Later, to stop listening for changes:
   * unlisten();
   *
   * @remarks
   * - The `this` context inside the callback refers to the `IconPackManager` instance, provided the callback
   *   is not rebound to another context (e.g., using `bind`, `call`, or `apply`).
   * - If the callback is defined as an arrow function, `this` will be lexically bound to the surrounding context.
   * - If the callback is a regular function, ensure it is bound correctly to avoid `this` being `undefined` (in strict mode)
   *   or the global object (in non-strict mode).
   *
   * @see {@link IconPackManager} for the class this method belongs to.
   * @see {@link UnlistenFn} for the type of the function returned by this method.
   */
  public async onChange(cb: () => void): Promise<UnlistenFn> {
    this.callbacks.add(cb);

    if (!this.unlistenerIcons && !this.unlistenerSettings) {
      this.unlistenerIcons = await IconPackList.onChange((list) => {
        this._iconPacks = list;
        this.callbacks.forEach((cb) => cb());
      });
      this.unlistenerSettings = await Settings.onChange((settings) => {
        this._actives = settings.inner.iconPacks;
        this.callbacks.forEach((cb) => cb());
      });
    }

    return () => {
      this.callbacks.delete(cb);
      if (this.callbacks.size === 0) {
        this.unlistenerIcons?.();
        this.unlistenerSettings?.();
      }
    };
  }

  /**
   * Returns the icon path for an app or file. If no icon is available, returns `null`.
   *
   * The search for icons follows this priority order:
   * 1. UMID (App User Model Id)
   * 2. Full path or filename (for executable files like .exe or .lnk)
   * 3. File extension (for non-executable files like .png, .jpg, .txt)
   *
   * Icon packs are searched in the order of their priority. An icon from a higher-priority pack
   * will override an icon from a lower-priority pack, even if the latter matches the search criteria.
   *
   * @param {Object} args - Arguments for retrieving the icon path.
   * @param {string} [args.path] - The full path to the app or file.
   * @param {string} [args.umid] - The UMID of the app.
   * @returns {string | null} - The path to the icon, or `null` if no icon is found.
   *
   * @example
   * // Example 1: Get icon by full path
   * const iconPath = instance.getIconPath({
   *   path: "C:\\Program Files\\Steam\\steam.exe"
   * });
   *
   * // Example 2: Get icon by UMID
   * const iconPath = instance.getIconPath({
   *   umid: "Seelen.SeelenUI_p6yyn03m1894e!App"
   * });
   */
  public getIconPath({ path, umid }: GetIconArgs): IIcon | null {
    // If neither path nor UMID is provided, return null
    if (!path && !umid) {
      return null;
    }

    // Create an ordered list of icon packs based on their priority
    const orderedPacks: IIconPack[] = [];
    for (const active of this.actives.toReversed()) {
      const pack = this._iconPacks.asArray().find((p) => p.metadata.filename === active);
      if (pack) {
        orderedPacks.push(pack);
      }
    }

    // Search by UMID first (highest priority)
    if (umid) {
      for (const pack of orderedPacks) {
        const icon = pack.apps[umid];
        if (icon) {
          return IconPackManager.resolveIcon(
            `${this.iconPackPath}\\${pack.metadata.filename}`,
            icon,
          );
        }
      }
    }

    // If no UMID is provided, search by path
    if (!path) {
      return null;
    }

    const lowercasedPath = path.toLowerCase();
    const isExecutable = lowercasedPath.endsWith('.exe') || lowercasedPath.endsWith('.lnk');

    // For non-executable files, search by file extension
    if (!isExecutable) {
      const extension = lowercasedPath.split('.').pop();
      if (!extension) {
        return null;
      }
      for (const pack of orderedPacks) {
        const icon = pack.files[extension];
        if (icon) {
          return IconPackManager.resolveIcon(
            `${this.iconPackPath}\\${pack.metadata.filename}`,
            icon,
          );
        }
      }
      return null;
    }

    // For executable files, search by full path or filename
    const filename = path.split(/[/\\]/g).pop();
    if (!filename) {
      return null;
    }

    for (const pack of orderedPacks) {
      const icon = pack.apps[path] || pack.apps[filename];
      if (icon) {
        return IconPackManager.resolveIcon(`${this.iconPackPath}\\${pack.metadata.filename}`, icon);
      }
    }

    // If no icon is found in any icon pack, return null
    return null;
  }

  /**
   * Returns the icon Url/Src for an app or file. If no icon is available, returns `null`.
   *
   * The search for icons follows this priority order:
   * 1. UMID (App User Model Id)
   * 2. Full path or filename (for executable files like .exe or .lnk)
   * 3. File extension (for non-executable files like .png, .jpg, .txt)
   *
   * Icon packs are searched in the order of their priority. An icon from a higher-priority pack
   * will override an icon from a lower-priority pack, even if the latter matches the search criteria.
   *
   * @param {Object} args - Arguments for retrieving the icon path.
   * @param {string} [args.path] - The full path to the app or file.
   * @param {string} [args.umid] - The UMID of the app.
   * @returns {string | null} - The path to the icon, or `null` if no icon is found.
   *
   * @example
   * // Example 1: Get icon by full path
   * const iconSrc = instance.getIconPath({
   *   path: "C:\\Program Files\\Steam\\steam.exe"
   * });
   *
   * // Example 2: Get icon by UMID
   * const iconSrc = instance.getIconPath({
   *   umid: "Seelen.SeelenUI_p6yyn03m1894e!App"
   * });
   */
  public getIcon({ path, umid }: GetIconArgs): IIcon | null {
    const iconPath = this.getIconPath({ path, umid });
    return iconPath ? IconPackManager.resolveIconAsSrc(iconPath) : null;
  }

  /**
   * Will return the special missing icon path from the highest priority icon pack.
   * If no icon pack haves a missing icon, will return null.
   */
  public getMissingIconPath(): IIcon | null {
    for (const active of this.actives.toReversed()) {
      const pack = this.iconPacks.asArray().find((p) => p.metadata.filename === active);
      if (pack && pack.missing) {
        return IconPackManager.resolveIcon(
          `${this.iconPackPath}\\${pack.metadata.filename}`,
          pack.missing,
        );
      }
    }
    return null;
  }

  /**
   * Will return the special missing icon SRC from the highest priority icon pack.
   * If no icon pack haves a missing icon, will return null.
   */
  public getMissingIcon(): IIcon | null {
    const iconPath = this.getMissingIconPath();
    return iconPath ? IconPackManager.resolveIconAsSrc(iconPath) : null;
  }

  /**
   * Will return the specifit icon path from the highest priority icon pack.
   * If no icon pack haves the searched icon, will return null.
   */
  public getSpecificIconPath(name: string): IIcon | null {
    for (const active of this.actives.toReversed()) {
      const pack = this.iconPacks.asArray().find((p) => p.metadata.filename === active);
      const icon = pack?.specific[name];
      if (icon) {
        return IconPackManager.resolveIcon(`${this.iconPackPath}\\${pack.metadata.filename}`, icon);
      }
    }
    return null;
  }

  /**
   * Will return the specifit icon SRC from the highest priority icon pack.
   * If no icon pack haves the searched icon, will return null.
   */
  public getSpecificIcon(name: string): IIcon | null {
    const iconPath = this.getSpecificIconPath(name);
    return iconPath ? IconPackManager.resolveIconAsSrc(iconPath) : null;
  }

  /**
   * Return the icon Path for an app or file, in case of no icon available will return `null`.\
   * This method doesn't take in care icon packs, just extracts the inherited icon into system's icon pack.
   *
   * @param filePath The path to the app could be umid o full path
   * @example
   * const iconPath = instance.extractIcon({
   *   path: "C:\\Program Files\\Steam\\steam.exe"
   * });
   * const iconPath = instance.extractIcon({
   *   umid: "Seelen.SeelenUI_p6yyn03m1894e!App"
   * });
   */
  public static extractIcon(obj: GetIconArgs): Promise<string | null> {
    return invoke(SeelenCommand.GetIcon, obj);
  }

  /**
   * This will delete all stored icons on the system icon pack.\
   * All icons should be regenerated after calling this method.
   */
  public static clearCachedIcons(): Promise<void> {
    return invoke(SeelenCommand.StateDeleteCachedIcons);
  }
}
