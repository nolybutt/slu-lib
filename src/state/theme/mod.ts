import type { Theme } from '@seelen-ui/types';
import { SeelenCommand, SeelenEvent } from '../../handlers/mod.ts';
import { List } from '../../utils/List.ts';
import { createInstanceInvoker, createInstanceOnEvent } from '../../utils/State.ts';

export class ThemeList extends List<Theme> {
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetThemes);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.StateThemesChanged);
}
