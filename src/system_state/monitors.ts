import { SeelenCommand, SeelenEvent } from '../lib.ts';
import { List } from '../utils/List.ts';
import { TauriCommand, WebviewEvent } from '../utils/State.ts';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.SystemGetMonitors]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.SystemGetMonitors]: ConnectedMonitor[];
  }
  interface PayloadByEvent {
    [SeelenEvent.SystemMonitorsChanged]: ConnectedMonitor[];
  }
}

export interface ConnectedMonitor {
  id: string;
  name: string;
  width: number;
  height: number;
  dpi: number;
}

@TauriCommand(SeelenCommand.SystemGetMonitors)
@WebviewEvent(SeelenEvent.SystemMonitorsChanged)
export class ConnectedMonitorList extends List<ConnectedMonitor> {
  static readonly getAsync: TauriCommand<ConnectedMonitorList>;
  static readonly onChange: WebviewEvent<ConnectedMonitorList>;
}
