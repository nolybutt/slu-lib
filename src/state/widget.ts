import { listen, type UnlistenFn } from '@tauri-apps/api/event';
import { invoke, SeelenCommand, SeelenEvent } from '../lib.ts';

export type WidgetId = string & { __brand: 'WidgetId' };

export interface Widget {
  id: WidgetId;
  js: string | null;
  css: string | null;
  html: string | null;
}

export class WidgetList {
  private constructor(private inner: Widget[]) {}

  static async getAsync(): Promise<WidgetList> {
    return new WidgetList(await invoke(SeelenCommand.StateGetWidgets));
  }

  static onChange(cb: (value: WidgetList) => void): Promise<UnlistenFn> {
    return listen<Widget[]>(SeelenEvent.StateWidgetsChanged, (event) => {
      cb(new WidgetList(event.payload));
    });
  }

  all(): Widget[] {
    return this.inner;
  }
}
