import { Obtainable, SeelenCommand, SeelenEvent } from '../handlers/index.js';
export * from './theme.js';
export * from './settings.js';
export * from './weg_items.js';
export * from './wm_layout.js';
export * from './placeholder.js';
export * from './settings_by_app.js';
export * from './settings_by_monitor.js';
export * from './icon_pack.js';
export * from './plugin.js';
export * from './widget.js';
export * from './profile.js';
export const LauncherHistory = Obtainable(SeelenCommand.StateGetHistory, SeelenEvent.StateHistoryChanged);
export class ResourceMetadata {
    displayName = 'Unknown';
    author = 'Unknown';
    description = '';
    filename = '';
    tags = [];
}
