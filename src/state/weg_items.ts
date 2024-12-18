import type { WegItem, WegItems as IWegItems } from '@seelen-ui/types';
import { SeelenCommand, SeelenEvent } from '../lib.ts';
import { createInstanceInvoker, createInstanceOnEvent } from '../utils/State.ts';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetWegItems]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetWegItems]: IWegItems;
  }
  interface PayloadByEvent {
    [SeelenEvent.StateWegItemsChanged]: IWegItems;
  }
}

export class WegItems {
  constructor(public inner: IWegItems) {}
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetWegItems);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.StateWegItemsChanged);
}

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

type WegItemType = WegItem['type'];
export const WegItemTypeEnum = {
  Pinned: 'Pinned',
  Temporal: 'Temporal',
  Separator: 'Separator',
  Media: 'Media',
  StartMenu: 'StartMenu',
} satisfies Record<WegItemType, WegItemType>;
