import type { NodeSubtype, NoFallbackBehavior, WindowManagerLayout, WmNode } from '@seelen-ui/types';
import { List } from '../utils/List.ts';
import { SeelenCommand, SeelenEvent } from '../lib.ts';
import { createInstanceInvoker, createInstanceOnEvent } from '../utils/State.ts';
import { enumFromUnion } from '../utils/enums.ts';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetLayouts]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetLayouts]: WindowManagerLayout[];
  }
  interface PayloadByEvent {
    [SeelenEvent.StateLayoutsChanged]: WindowManagerLayout[];
  }
}

export class WindowManagerLayoutList extends List<WindowManagerLayout> {
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetLayouts);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.StateLayoutsChanged);
}

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

const NodeType = enumFromUnion<WmNode['type']>({
  Vertical: 'Vertical',
  Horizontal: 'Horizontal',
  Leaf: 'Leaf',
  Stack: 'Stack',
  Fallback: 'Fallback',
});

const NodeSubtype = enumFromUnion<NodeSubtype>({
  Temporal: 'Temporal',
  Permanent: 'Permanent',
});

const NoFallbackBehavior = enumFromUnion<NoFallbackBehavior>({
  Float: 'Float',
  Unmanaged: 'Unmanaged',
});

export { NodeSubtype, NodeType, NoFallbackBehavior };
