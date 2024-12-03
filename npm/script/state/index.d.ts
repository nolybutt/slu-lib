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
export interface LauncherHistory {
    [x: string]: string[];
}
export declare const LauncherHistory: {
    new (): {};
    getAsync(): Promise<LauncherHistory>;
    onChange(cb: (value: LauncherHistory) => void): Promise<() => void>;
};
export declare class ResourceMetadata {
    displayName: string;
    author: string;
    description: string;
    filename: string;
    tags: string[];
}
//# sourceMappingURL=index.d.ts.map