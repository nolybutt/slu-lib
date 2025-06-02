import type { ThirdPartyWidgetSettings, Widget as IWidget, WidgetId, WsdGroupEntry } from '@seelen-ui/types';
import { SeelenCommand, SeelenEvent, type UnSubscriber } from '../../handlers/mod.ts';
import { List } from '../../utils/List.ts';
import { newFromInvoke, newOnEvent } from '../../utils/State.ts';
import { getCurrentWebviewWindow, type WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { decodeBase64Url } from '@std/encoding/base64url';

export const SeelenSettingsWidgetId: WidgetId = '@seelen/settings';
export const SeelenPopupWidgetId: WidgetId = '@seelen/popup';
export const SeelenWegWidgetId: WidgetId = '@seelen/weg';
export const SeelenToolbarWidgetId: WidgetId = '@seelen/fancy-toolbar';
export const SeelenWindowManagerWidgetId: WidgetId = '@seelen/window-manager';
export const SeelenLauncherWidgetId: WidgetId = '@seelen/launcher';
export const SeelenWallWidgetId: WidgetId = '@seelen/wallpaper-manager';

export class WidgetList extends List<IWidget> {
  static getAsync(): Promise<WidgetList> {
    return newFromInvoke(this, SeelenCommand.StateGetWidgets);
  }

  static onChange(cb: (user: WidgetList) => void): Promise<UnSubscriber> {
    return newOnEvent(cb, this, SeelenEvent.StateWidgetsChanged);
  }
}

interface WidgetInformation {
  /** decoded webview label */
  label: string;
  /** Will be present if the widget replicas is set to by monitor */
  monitorId?: string;
  /** Will be present if the widget replicas is set to multiple */
  instanceId?: string;
  /** params present on the webview label */
  params: { readonly [key in string]?: string };
}

/**
 * Represents the widget instance running in the current webview
 */
export class Widget {
  /** widget id */
  public readonly id: WidgetId;
  /** widget definition */
  public readonly def: IWidget;
  /** decoded widget instance information */
  public readonly decoded: WidgetInformation;
  /** current webview window */
  public readonly webview: WebviewWindow;

  private constructor(widget: IWidget) {
    this.def = widget;
    this.webview = getCurrentWebviewWindow();

    const encodedLabel = this.webview.label;
    const decodedLabel = new TextDecoder().decode(decodeBase64Url(encodedLabel));
    const [id, query] = decodedLabel.split('?');

    const params = new URLSearchParams(query);
    const paramsObj = Object.freeze(Object.fromEntries(params));

    this.id = id as WidgetId;
    this.decoded = Object.freeze({
      label: decodedLabel,
      rawLabel: encodedLabel,
      monitorId: paramsObj.monitorId,
      instanceId: paramsObj.instanceId,
      params: Object.freeze(Object.fromEntries(params)),
    });
  }

  static getCurrentWidgetId(): WidgetId {
    const encondedLabel = getCurrentWebviewWindow().label;
    const decodedLabel = new TextDecoder().decode(decodeBase64Url(encondedLabel));
    const [id] = decodedLabel.split('?');
    if (!id) {
      throw new Error('Missing widget id on webview label');
    }
    return id as WidgetId;
  }

  static async getCurrentAsync(): Promise<Widget> {
    const currentWidgetId = this.getCurrentWidgetId();
    const list = await WidgetList.getAsync();
    const widget = list.asArray().find((widget) => widget.id === currentWidgetId);
    if (!widget) {
      throw new Error('Current Widget not found');
    }
    return new Widget(widget);
  }

  private static getEntryDefaultValues(entry: WsdGroupEntry): Record<string, unknown> {
    if ('subgroup' in entry) {
      const config: Record<string, unknown> = {};
      const header = entry.subgroup.header;
      if (header) {
        config[header.key] = header.defaultValue;
      }

      for (const item of entry.subgroup.content) {
        Object.assign(config, Widget.getEntryDefaultValues(item));
      }

      return config;
    }

    return {
      [entry.config.key]: entry.config.defaultValue,
    };
  }

  /** Returns the default config of the widget, declared on the widget definition */
  getDefaultConfig(): ThirdPartyWidgetSettings {
    const config: ThirdPartyWidgetSettings = { enabled: true };
    for (const { group } of this.def.settings) {
      for (const entry of group) {
        Object.assign(config, Widget.getEntryDefaultValues(entry));
      }
    }
    return config;
  }
}
