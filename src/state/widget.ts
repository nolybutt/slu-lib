import { SeelenCommand, SeelenEvent } from '../lib.ts';
import { List } from '../utils/List.ts';
import { TauriCommand, WebviewEvent } from '../utils/State.ts';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetWidgets]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetWidgets]: Widget[];
  }
  interface PayloadByEvent {
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

@TauriCommand(SeelenCommand.StateGetWidgets)
@WebviewEvent(SeelenEvent.StateWidgetsChanged)
export class WidgetList extends List<Widget> {
  static readonly getAsync: TauriCommand<WidgetList>;
  static readonly onChange: WebviewEvent<WidgetList>;
}
