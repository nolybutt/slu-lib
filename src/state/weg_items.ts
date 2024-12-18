import type { WegItem, WegItems as IWegItems } from '@seelen-ui/types';
import { SeelenCommand, SeelenEvent } from '../lib.ts';
import { TauriCommand, WebviewEvent } from '../utils/State.ts';

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

@TauriCommand(SeelenCommand.StateGetWegItems)
@WebviewEvent(SeelenEvent.StateWegItemsChanged)
export class WegItems {
  constructor(public inner: IWegItems) {}

  static readonly getAsync: TauriCommand<WegItems>;
  static readonly onChange: WebviewEvent<WegItems>;
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
