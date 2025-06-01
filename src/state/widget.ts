import type { ThirdPartyWidgetSettings, Widget as IWidget, WidgetId, WsdGroupEntry } from '@seelen-ui/types';
import { SeelenCommand, SeelenEvent, type UnSubscriber } from '../handlers/mod.ts';
import { List } from '../utils/List.ts';
import { newFromInvoke, newOnEvent } from '../utils/State.ts';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { decodeBase64Url } from '@std/encoding/base64url';

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

export interface Widget extends IWidget {}

export class Widget {
  private constructor(plain: IWidget) {
    Object.assign(this, plain);
  }

  static async getCurrentAsync(): Promise<Widget> {
    const list = await WidgetList.getAsync();
    const widget = list.asArray().find((widget) => widget.id === getCurrentWidgetInfo().id);
    if (!widget) throw new Error('Current Widget not found');
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
    for (const { group } of this.settings) {
      for (const entry of group) {
        Object.assign(config, Widget.getEntryDefaultValues(entry));
      }
    }
    return config;
  }
}

interface WidgetInformation {
  id: WidgetId;
  /** Will be present if the widget replicas is set to by monitor */
  monitorId?: string;
  /** Will be present if the widget replicas is set to multiple */
  instanceId?: string;
  /** decoded webview label */
  label: string;
  /** base64 url encoded label (used as identifier of the webview) */
  rawLabel: string;
  params: { readonly [key in string]?: string };
}

const CACHED_WIDGET_INFORMATION: { ref: Readonly<WidgetInformation> | null } = {
  ref: null,
};

function _getCurrentWidget(): Readonly<WidgetInformation> {
  const encodedLabel = getCurrentWebviewWindow().label;
  const decodedLabel = new TextDecoder().decode(decodeBase64Url(encodedLabel));
  const [id, query] = decodedLabel.split('?');

  const params = new URLSearchParams(query);
  const paramsObj = Object.freeze(Object.fromEntries(params));

  return Object.freeze({
    id: id as WidgetId,
    label: decodedLabel,
    rawLabel: encodedLabel,
    monitorId: paramsObj.monitorId,
    instanceId: paramsObj.instanceId,
    params: Object.freeze(Object.fromEntries(params)),
  });
}

/** If called on backend context, will return an empty structure */
export function getCurrentWidgetInfo(): Readonly<WidgetInformation> {
  // deno-lint-ignore no-explicit-any
  if (!globalThis.window || !(globalThis.window as any).__TAURI_INTERNALS__) {
    return {
      id: '',
      label: '',
      rawLabel: '',
      params: {},
    };
  }
  if (!CACHED_WIDGET_INFORMATION.ref) {
    CACHED_WIDGET_INFORMATION.ref = _getCurrentWidget();
  }
  return CACHED_WIDGET_INFORMATION.ref;
}
