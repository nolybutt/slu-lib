import { invoke, SeelenCommand, SeelenEvent, subscribe } from '../lib.ts';
import { List } from '../utils/List.ts';

declare global {
  interface ArgsBySeelenCommand {
    [SeelenCommand.StateGetWidgets]: null;
  }
  interface ReturnBySeelenCommand {
    [SeelenCommand.StateGetWidgets]: Widget[];
  }
  interface PayloadBySeelenEvent {
    [SeelenEvent.StateWidgetsChanged]: Widget[];
  }
}

export type WidgetId = string & { __brand: 'WidgetId' };

export interface Widget {
  id: WidgetId;
  js: string | null;
  css: string | null;
  html: string | null;
}

export class WidgetList extends List<Widget> {
  static override async getAsync(): Promise<WidgetList> {
    return new WidgetList(await invoke(SeelenCommand.StateGetWidgets));
  }

  static onChange(cb: (value: WidgetList) => void): Promise<() => void> {
    return subscribe(SeelenEvent.StateWidgetsChanged, (event) => {
      cb(new WidgetList(event.payload));
    });
  }
}
