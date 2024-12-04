import { Obtainable, SeelenCommand, SeelenEvent } from '../handlers/index.ts';

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

const _LauncherHistory = Obtainable<LauncherHistory>(
  SeelenCommand.StateGetHistory,
  SeelenEvent.StateHistoryChanged,
);

export class LauncherHistory {
  [x: string]: string[];

  static async getAsync(): Promise<LauncherHistory> {
    return await _LauncherHistory.getAsync();
  }

  static async onChange(cb: (value: LauncherHistory) => void): Promise<() => void> {
    return await _LauncherHistory.onChange(cb);
  }
}

export class ResourceMetadata {
  displayName: string = 'Unknown';
  author: string = 'Unknown';
  description: string = '';
  filename: string = '';
  tags: string[] = [];
}
