import { SeelenCommand, SeelenEvent, invoke } from "../handlers/mod.ts";
import { createInstanceInvoker, createInstanceOnEvent } from "../utils/State.ts";
import { List } from "../utils/List.ts";
import { enumFromUnion } from "../utils/enums.ts";
import type { File, FolderChangedArgs, FolderType, User } from "@seelen-ui/types";
import type { UnlistenFn } from "@tauri-apps/api/event";
import { subscribe } from "../handlers/invokers.ts";

declare global {
  interface ArgsByCommand {
    [SeelenCommand.GetUser]: null;
    [SeelenCommand.GetUserFolderContent]: { folderType: FolderType };
    [SeelenCommand.SetUserFolderLimit]: { folderType: FolderType; amount: number };
  }
  interface ReturnByCommand {
    [SeelenCommand.GetUser]: User;
    [SeelenCommand.GetUserFolderContent]: File[];
    [SeelenCommand.SetUserFolderLimit]: void;
  }
  interface PayloadByEvent {
    [SeelenEvent.UserChanged]: User;
    [SeelenEvent.UserFolderChanged]: FolderChangedArgs;
  }
}

const FolderType = enumFromUnion<FolderType>({
  Unknown: "Unknown",
  Recent: "Recent",
  Downloads: "Downloads",
  Documents: "Documents",
  Pictures: "Pictures",
  Videos: "Videos",
  Music: "Music",
});

export class UserDetails {
  constructor(public user: User) {}

  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.GetUser);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.UserChanged);
}

export class UserDirectory extends List<File> {
  static readonly folderType: FolderType = FolderType.Unknown;

  static async getAsync(): Promise<UserDirectory> {
    return new this(
      await invoke(SeelenCommand.GetUserFolderContent, { folderType: this.folderType })
    );
  }

  static setDirectoryLimit(amount: number): Promise<void> {
    return invoke(SeelenCommand.SetUserFolderLimit, { folderType: this.folderType, amount });
  }

  static onChange(cb: (instance: RecentFolder) => void): Promise<UnlistenFn> {
    return subscribe(SeelenEvent.UserFolderChanged, (data) => {
      if (data.payload.ofFolder == this.folderType && data.payload.content) {
        cb(new this(data.payload.content));
      }
    });
  }

  static default(): UserDirectory {
    return new this([]);
  }
}

export class RecentFolder extends UserDirectory {
  static override readonly folderType = FolderType.Recent;
}

export class DownloadsFolder extends UserDirectory {
  static override readonly folderType = FolderType.Downloads;
}

export class DocumentsFolder extends UserDirectory {
  static override readonly folderType = FolderType.Documents;
}

export class PicturesFolder extends UserDirectory {
  static override readonly folderType = FolderType.Pictures;
}

export class VideosFolder extends UserDirectory {
  static override readonly folderType = FolderType.Videos;
}

export class MusicFolder extends UserDirectory {
  static override readonly folderType = FolderType.Music;
}
