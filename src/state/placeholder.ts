import type { DateUpdateInterval, ToolbarItem, WorkspaceToolbarItemMode } from '@seelen-ui/types';
import { enumFromUnion } from '../utils/enums.ts';

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

const ToolbarModuleType = enumFromUnion<ToolbarItem['type']>({
  Text: 'text',
  Generic: 'generic',
  Date: 'date',
  Power: 'power',
  Network: 'network',
  Media: 'media',
  Tray: 'tray',
  Notifications: 'notifications',
  Device: 'device',
  Settings: 'settings',
  Workspaces: 'workspaces',
});

const WorkspaceToolbarItemMode = enumFromUnion<WorkspaceToolbarItemMode>({
  Dotted: 'dotted',
  Named: 'named',
  Numbered: 'numbered',
});

const DateUpdateInterval = enumFromUnion<DateUpdateInterval>({
  Millisecond: 'millisecond',
  Second: 'second',
  Minute: 'minute',
  Hour: 'hour',
  Day: 'day',
});

export { DateUpdateInterval, ToolbarModuleType, WorkspaceToolbarItemMode };
