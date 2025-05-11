import type { Profile } from '@seelen-ui/types';
import { SeelenCommand } from '../handlers/mod.ts';
import { List } from '../utils/List.ts';
import { createInstanceInvoker } from '../utils/State.ts';

export class ProfileList extends List<Profile> {
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetProfiles);
}
