import type { ToolbarItem, WorkspaceToolbarItemMode } from '@seelen-ui/types';
import { enumFromUnion } from '../utils/enums.ts';

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

const ToolbarModuleType = enumFromUnion<ToolbarItem['type']>({
  Text: 'text',
  Generic: 'generic',
  Date: 'date',
  Power: 'power',
  Keyboard: 'keyboard',
  Network: 'network',
  Bluetooth: 'bluetooth',
  Media: 'media',
  Tray: 'tray',
  User: 'user',
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

export { ToolbarModuleType, WorkspaceToolbarItemMode };
