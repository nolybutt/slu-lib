import type { IconPack } from '@seelen-ui/types';
import { List } from '../utils/List.ts';
import { createInstanceInvoker, createInstanceOnEvent } from '../utils/State.ts';
import { SeelenCommand, SeelenEvent } from '../lib.ts';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetIconPacks]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetIconPacks]: IconPack;
  }
  interface PayloadByEvent {
    [SeelenEvent.StateIconPacksChanged]: IconPack;
  }
}

export class IconPackList extends List<IconPack> {
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetIconPacks);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.StateIconPacksChanged);
}

export class IconPackManager {
  getIconForApp(_path: string): string | null {
    return null;
  }
}
