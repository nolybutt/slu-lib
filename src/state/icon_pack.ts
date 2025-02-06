import type { IconPack } from "@seelen-ui/types";
import { List } from "../utils/List.ts";
import { createInstanceInvoker, createInstanceOnEvent } from "../utils/State.ts";
import { invoke, SeelenCommand, SeelenEvent } from "../handlers/mod.ts";
import { path } from "@tauri-apps/api";
import { Settings } from "./settings/mod.ts";
import { convertFileSrc } from "@tauri-apps/api/core";

export interface GetIconArgs {
  path?: string | null;
  umid?: string | null;
}

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetIconPacks]: null;
    [SeelenCommand.GetIcon]: GetIconArgs;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetIconPacks]: IconPack[];
    [SeelenCommand.GetIcon]: string | null;
  }
  interface PayloadByEvent {
    [SeelenEvent.StateIconPacksChanged]: IconPack[];
  }
}

export class IconPackList extends List<IconPack> {
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetIconPacks);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.StateIconPacksChanged);
}

/**
 * Class helper to allow easy use of icon packs
 */
export class IconPackManager {
  private callbacks: Set<() => void> = new Set();

  protected constructor(
    protected iconPackPath: string,
    protected _iconPacks: IconPackList,
    protected _actives: string[]
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
    const manager = new IconPackManager(
      await path.resolve(await path.appDataDir(), "icons"),
      await IconPackList.getAsync(),
      (await Settings.getAsync()).inner.iconPacks
    );
    IconPackList.onChange((list) => {
      manager._iconPacks = list;
      manager.callbacks.forEach((cb) => cb());
    });
    Settings.onChange((settings) => {
      manager._actives = settings.inner.iconPacks;
      manager.callbacks.forEach((cb) => cb());
    });
    return manager;
  }

  /**
   * Register a callback to be called when the list of active icon packs changes
   *
   * @param cb The callback to be called when the list of icon packs changes
   * @example
   * const manager = await IconPackManager.create();
   * manager.onChange(() => {
   *   console.log("Icon packs changed: ", manager.actives);
   * });
   */
  public onChange(cb: () => void): void {
    this.callbacks.add(cb);
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
  public getIconPath({ path, umid }: GetIconArgs): string | null {
    // If neither path nor UMID is provided, return null
    if (!path && !umid) {
      return null;
    }

    // Create an ordered list of icon packs based on their priority
    const orderedPacks: IconPack[] = [];
    for (const active of this.actives.toReversed()) {
      const pack = this._iconPacks.asArray().find((p) => p.metadata.filename === active);
      if (pack) {
        orderedPacks.push(pack);
      }
    }

    // Search by UMID first (highest priority)
    if (umid) {
      for (const pack of orderedPacks) {
        const subPath = pack.apps[umid];
        if (subPath) {
          return `${this.iconPackPath}\\${pack.metadata.filename}\\${subPath}`;
        }
      }
    }

    // If no UMID is provided, search by path
    if (!path) {
      return null;
    }

    const lowercasedPath = path.toLowerCase();
    const isExecutable = lowercasedPath.endsWith(".exe") || lowercasedPath.endsWith(".lnk");

    // For non-executable files, search by file extension
    if (!isExecutable) {
      const extension = lowercasedPath.split(".").pop();
      if (!extension) {
        return null;
      }

      for (const pack of orderedPacks) {
        const subPath = pack.files[extension];
        if (subPath) {
          return `${this.iconPackPath}\\${pack.metadata.filename}\\${subPath}`;
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
      const subPath = pack.apps[path] || pack.apps[filename];
      if (subPath) {
        return `${this.iconPackPath}\\${pack.metadata.filename}\\${subPath}`;
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
  public getIcon({ path, umid }: GetIconArgs): string | null {
    const iconPath = this.getIconPath({ path, umid });
    return iconPath ? convertFileSrc(iconPath) : null;
  }

  /**
   * Return the icon Path for an app or file, in case of no icon available will return `null`.
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
}
