import { invoke, SeelenCommand } from "../handlers/index.ts";
import { List } from "../utils/List.ts";
import type { Placeholder } from "./placeholder.ts";

declare global {
  interface ArgsBySeelenCommand {
    [SeelenCommand.StateGetProfiles]: null;
  }
  interface ReturnBySeelenCommand {
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
  static override async getAsync(): Promise<ProfileList> {
    return new ProfileList(await invoke(SeelenCommand.StateGetProfiles));
  }
}
