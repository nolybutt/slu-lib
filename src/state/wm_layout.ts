import type { NodeSubtype, NoFallbackBehavior, WmNode } from '@seelen-ui/types';
import type { Enum } from '../utils/enums.ts';

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

const NodeType: Enum<WmNode['type']> = {
  Vertical: 'Vertical',
  Horizontal: 'Horizontal',
  Leaf: 'Leaf',
  Stack: 'Stack',
  Fallback: 'Fallback',
};

const NodeSubtype: Enum<NodeSubtype> = {
  Temporal: 'Temporal',
  Permanent: 'Permanent',
};

const NoFallbackBehavior: Enum<NoFallbackBehavior> = {
  Float: 'Float',
  Unmanaged: 'Unmanaged',
};

export { NodeSubtype, NodeType, NoFallbackBehavior };
