import type { WegItem, WegItems as IWegItems } from '@seelen-ui/types';
import { invoke, SeelenCommand, SeelenEvent, type UnSubscriber } from '../handlers/mod.ts';
import { newFromInvoke, newOnEvent } from '../utils/State.ts';
import type { Enum } from '../utils/enums.ts';
import { getCurrentWindow } from '@tauri-apps/api/window';

export class WegItems {
  constructor(public inner: IWegItems) {}

  /** Will return the stored/saved weg items */
  static getStored(): Promise<WegItems> {
    return newFromInvoke(this, SeelenCommand.StateGetWegItems);
  }

  /** Event triggered when the file where the weg items are stored is changed */
  static onStoredChange(cb: (user: WegItems) => void): Promise<UnSubscriber> {
    return newOnEvent(cb, this, SeelenEvent.StateWegItemsChanged);
  }

  /** Will return the weg items intance for the current widget */
  static forCurrentWidget(): Promise<WegItems> {
    return newFromInvoke(this, SeelenCommand.WegGetItemsForWidget);
  }

  /** Event triggered when the weg items for the current widget are changed */
  static forCurrentWidgetChange(cb: (user: WegItems) => void): Promise<UnSubscriber> {
    return newOnEvent(cb, this, SeelenEvent.WegInstanceChanged, {
      target: { kind: 'Webview', label: getCurrentWindow().label },
    });
  }

  /** Will store the weg items placeoments on disk */
  save(): Promise<void> {
    return invoke(SeelenCommand.StateWriteWegItems, { items: this.inner });
  }
}

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

const WegItemType: Enum<WegItem['type']> = {
  Pinned: 'Pinned',
  Temporal: 'Temporal',
  Separator: 'Separator',
  Media: 'Media',
  StartMenu: 'StartMenu',
};

export { WegItemType };
