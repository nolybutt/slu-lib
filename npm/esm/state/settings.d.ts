import { Rect } from '../utils/index.js';
import { MonitorConfiguration } from './settings_by_monitor.js';
export declare enum VirtualDesktopStrategy {
    Native = "Native",
    Seelen = "Seelen"
}
export declare enum SeelenWegMode {
    FullWidth = "Full-Width",
    MinContent = "Min-Content"
}
export declare enum HideMode {
    Never = "Never",
    Always = "Always",
    OnOverlap = "On-Overlap"
}
export declare enum SeelenWegSide {
    Left = "Left",
    Right = "Right",
    Top = "Top",
    Bottom = "Bottom"
}
export declare class SeelenWallWallpaper {
    id: string;
    path: string;
}
export declare class SeelenWallSettings {
    enabled: boolean;
    backgrounds: SeelenWallWallpaper[];
    /** Interval in seconds */
    interval: number;
    randomize: boolean;
}
export declare enum SeelenLauncherMonitor {
    Primary = "Primary",
    MouseOver = "Mouse-Over"
}
export declare class SeelenLauncherRunner {
    id: string;
    label: string;
    program: string;
    readonly: boolean;
}
export declare class SeelenLauncherSettings {
    enabled: boolean;
    monitor: SeelenLauncherMonitor;
    runners: SeelenLauncherRunner[];
}
export declare enum UpdateChannel {
    Release = "Release",
    Beta = "Beta",
    Nightly = "Nightly"
}
export declare class UpdaterSettings {
    channel: UpdateChannel;
}
declare const Settings_base: {
    new (): {};
    getAsync(): Promise<Settings>;
    onChange(cb: (value: Settings) => void): Promise<() => void>;
};
export declare class Settings extends Settings_base {
    fancyToolbar: FancyToolbarSettings;
    seelenweg: SeelenWegSettings;
    windowManager: WindowManagerSettings;
    wall: SeelenWallSettings;
    launcher: SeelenLauncherSettings;
    monitors: MonitorConfiguration[];
    ahkEnabled: boolean;
    ahkVariables: AhkVarList;
    selectedThemes: string[];
    iconPacks: string[];
    devTools: boolean;
    language: string;
    dateFormat: string;
    virtualDesktopStrategy: VirtualDesktopStrategy;
    updater: UpdaterSettings;
}
export declare class FancyToolbarSettings {
    enabled: boolean;
    height: number;
    placeholder: string;
    hideMode: HideMode;
    delayToShow: number;
    delayToHide: number;
}
export declare class SeelenWegSettings {
    enabled: boolean;
    mode: SeelenWegMode;
    hideMode: HideMode;
    position: SeelenWegSide;
    visibleSeparators: boolean;
    size: number;
    zoomSize: number;
    margin: number;
    padding: number;
    spaceBetweenItems: number;
    delayToShow: number;
    delayToHide: number;
}
export declare class Border {
    enabled: boolean;
    width: number;
    offset: number;
}
export declare class FloatingWindowSettings {
    width: number;
    height: number;
}
export declare class WindowManagerSettings {
    enabled: boolean;
    autoStackingByCategory: boolean;
    border: Border;
    resizeDelta: number;
    workspaceGap: number;
    workspacePadding: number;
    workspaceMargin: Rect;
    floating: FloatingWindowSettings;
    defaultLayout: string;
}
export declare class AhkVar {
    fancy: string;
    ahk: string;
    readonly: boolean;
    constructor(fancy?: string, ahk?: string);
}
export declare class AhkVarList {
    toggleLauncher: AhkVar;
    reserveTop: AhkVar;
    reserveBottom: AhkVar;
    reserveLeft: AhkVar;
    reserveRight: AhkVar;
    reserveFloat: AhkVar;
    reserveStack: AhkVar;
    focusTop: AhkVar;
    focusBottom: AhkVar;
    focusLeft: AhkVar;
    focusRight: AhkVar;
    focusLatest: AhkVar;
    increaseWidth: AhkVar;
    decreaseWidth: AhkVar;
    increaseHeight: AhkVar;
    decreaseHeight: AhkVar;
    restoreSizes: AhkVar;
    switchWorkspace0: AhkVar;
    switchWorkspace1: AhkVar;
    switchWorkspace2: AhkVar;
    switchWorkspace3: AhkVar;
    switchWorkspace4: AhkVar;
    switchWorkspace5: AhkVar;
    switchWorkspace6: AhkVar;
    switchWorkspace7: AhkVar;
    switchWorkspace8: AhkVar;
    switchWorkspace9: AhkVar;
    moveToWorkspace0: AhkVar;
    moveToWorkspace1: AhkVar;
    moveToWorkspace2: AhkVar;
    moveToWorkspace3: AhkVar;
    moveToWorkspace4: AhkVar;
    moveToWorkspace5: AhkVar;
    moveToWorkspace6: AhkVar;
    moveToWorkspace7: AhkVar;
    moveToWorkspace8: AhkVar;
    moveToWorkspace9: AhkVar;
    sendToWorkspace0: AhkVar;
    sendToWorkspace1: AhkVar;
    sendToWorkspace2: AhkVar;
    sendToWorkspace3: AhkVar;
    sendToWorkspace4: AhkVar;
    sendToWorkspace5: AhkVar;
    sendToWorkspace6: AhkVar;
    sendToWorkspace7: AhkVar;
    sendToWorkspace8: AhkVar;
    sendToWorkspace9: AhkVar;
    miscOpenSettings: AhkVar;
    miscToggleLockTracing: AhkVar;
    miscToggleWinEventTracing: AhkVar;
}
export {};
//# sourceMappingURL=settings.d.ts.map