import { SeelenCommand } from '../../handlers/mod.ts';

import type { MonitorConfiguration as IMonitorConfiguration, WorkspaceIdentifierType } from '@seelen-ui/types';
import { newFromInvoke } from '../../utils/State.ts';
import type { Enum } from '../../utils/enums.ts';

export class MonitorConfiguration {
  constructor(public inner: IMonitorConfiguration) {}

  static default(): Promise<MonitorConfiguration> {
    return newFromInvoke(this, SeelenCommand.StateGetDefaultMonitorSettings);
  }
}

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

const WorkspaceIdentifierType: Enum<WorkspaceIdentifierType> = {
  Name: 'Name',
  Index: 'Index',
};

export { WorkspaceIdentifierType };
