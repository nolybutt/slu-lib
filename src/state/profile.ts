import { SeelenCommand } from '../handlers/mod.ts';
import { List } from '../utils/List.ts';
import { createInstanceInvoker } from '../utils/State.ts';
import type { Placeholder } from './placeholder.ts';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetProfiles]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetProfiles]: Profile[];
  }
}

export interface ProfileSettings {
  themes: string[];
}

export interface Profile {
  name: string;
  toolbarLayour: Placeholder;
  settings: ProfileSettings;
}

export class ProfileList extends List<Profile> {
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetProfiles);
}
