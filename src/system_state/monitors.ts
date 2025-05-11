import { SeelenCommand, SeelenEvent } from '../handlers/mod.ts';
import type { PhysicalMonitor } from '@seelen-ui/types';
import { List } from '../utils/List.ts';
import { createInstanceInvoker, createInstanceOnEvent } from '../utils/State.ts';

export class ConnectedMonitorList extends List<PhysicalMonitor> {
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.SystemGetMonitors);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.SystemMonitorsChanged);
}
