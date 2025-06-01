import type { Theme } from '@seelen-ui/types';
import { SeelenCommand, SeelenEvent, type UnSubscriber } from '../../handlers/mod.ts';
import { List } from '../../utils/List.ts';
import { newFromInvoke, newOnEvent } from '../../utils/State.ts';

export class ThemeList extends List<Theme> {
  static getAsync(): Promise<ThemeList> {
    return newFromInvoke(this, SeelenCommand.StateGetThemes);
  }

  static onChange(cb: (user: ThemeList) => void): Promise<UnSubscriber> {
    return newOnEvent(cb, this, SeelenEvent.StateThemesChanged);
  }
}
