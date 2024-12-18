import { invoke, SeelenCommand } from '../lib.ts';

import type { MonitorConfiguration as IMonitorConfiguration, WorkspaceIdentifierType } from '@seelen-ui/types';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetDefaultMonitorSettings]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetDefaultMonitorSettings]: IMonitorConfiguration;
  }
}

export class MonitorConfiguration {
  constructor(public inner: IMonitorConfiguration) {}
  static async default(): Promise<MonitorConfiguration> {
    return new this(await invoke(SeelenCommand.StateGetDefaultMonitorSettings));
  }
}

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

export const WorkspaceIdentifierTypeEnum = {
  Name: 'Name',
  Index: 'Index',
} satisfies Record<WorkspaceIdentifierType, WorkspaceIdentifierType>;
