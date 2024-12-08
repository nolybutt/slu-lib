import { listen, type UnlistenFn } from '@tauri-apps/api/event';
import { invoke, SeelenCommand, SeelenEvent } from '../lib.ts';

export interface ConnectedMonitor {
  id: string;
  name: string;
  width: number;
  height: number;
  dpi: number;
}

export class ConnectedMonitorList {
  private constructor(private inner: ConnectedMonitor[]) {}

  static async getAsync(): Promise<ConnectedMonitorList> {
    return new ConnectedMonitorList(await invoke(SeelenCommand.SystemGetMonitors));
  }

  static onChange(cb: (value: ConnectedMonitorList) => void): Promise<UnlistenFn> {
    return listen<ConnectedMonitor[]>(SeelenEvent.SystemMonitorsChanged, (event) => {
      cb(new ConnectedMonitorList(event.payload));
    });
  }

  all(): ConnectedMonitor[] {
    return this.inner;
  }
}
