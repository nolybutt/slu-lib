import { invoke, SeelenCommand, SeelenEvent, subscribe } from "../lib.ts";
import { List } from "../utils/List.ts";

declare global {
  interface ArgsBySeelenCommand {
    [SeelenCommand.SystemGetMonitors]: null;
  }
  interface ReturnBySeelenCommand {
    [SeelenCommand.SystemGetMonitors]: ConnectedMonitor[];
  }
  interface PayloadBySeelenEvent {
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

export class ConnectedMonitorList extends List<ConnectedMonitor> {
  static override async getAsync() {
    return new ConnectedMonitorList(await invoke(SeelenCommand.SystemGetMonitors));
  }

  static onChange(cb: (value: ConnectedMonitorList) => void) {
    return subscribe(SeelenEvent.SystemMonitorsChanged, (event) => {
      cb(new ConnectedMonitorList(event.payload));
    });
  }
}
