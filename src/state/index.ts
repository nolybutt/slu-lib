import { SeelenCommand, SeelenEvent } from '../handlers/index.ts';
import { invoke, subscribe } from '../lib.ts';

export * from './theme.ts';
export * from './settings.ts';
export * from './weg_items.ts';
export * from './wm_layout.ts';
export * from './placeholder.ts';
export * from './settings_by_app.ts';
export * from './settings_by_monitor.ts';
export * from './icon_pack.ts';
export * from './plugin.ts';
export * from './widget.ts';
export * from './profile.ts';

declare global {
  interface ArgsBySeelenCommand {
    [SeelenCommand.StateGetHistory]: null;
  }
  interface ReturnBySeelenCommand {
    [SeelenCommand.StateGetHistory]: LauncherHistory;
  }
  interface PayloadBySeelenEvent {
    [SeelenEvent.StateHistoryChanged]: LauncherHistory;
  }
}

export class LauncherHistory {
  [x: string]: string[];

  static getAsync(): Promise<LauncherHistory> {
    return invoke(SeelenCommand.StateGetHistory);
  }

  static onChange(cb: (value: LauncherHistory) => void): Promise<() => void> {
    return subscribe(SeelenEvent.StateHistoryChanged, (event) => {
      cb(event.payload);
    });
  }
}

export class ResourceMetadata {
  displayName: string = 'Unknown';
  author: string = 'Unknown';
  description: string = '';
  filename: string = '';
  tags: string[] = [];
}
