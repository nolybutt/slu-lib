import type { Rect } from '../utils/index.js';
import type { SeelenWallWallpaper } from './settings.js';
export declare class FancyToolbarSettingsByMonitor {
    enabled: boolean;
}
export declare class SeelenWegSettingsByMonitor {
    enabled: boolean;
}
export declare class WindowManagerSettingsByMonitor {
    enabled: boolean;
    padding: number | null;
    margin: Rect | null;
    gap: number | null;
    layout: string | null;
}
export declare class SeelenWallSettingsByMonitor {
    enabled: boolean;
    backgrounds: SeelenWallWallpaper[] | null;
}
export declare enum WorkspaceIdentifierType {
    Name = "name",
    Index = "index"
}
export declare class WorkspaceIdentifier {
    id: string;
    kind: WorkspaceIdentifierType;
    constructor(id: string, kind: WorkspaceIdentifierType);
}
export declare class WorkspaceConfiguration {
    identifier: WorkspaceIdentifier;
    layout: string | null;
    backgrounds: SeelenWallWallpaper[] | null;
    constructor(identifier: WorkspaceIdentifier);
}
export declare class MonitorConfiguration {
    tb: FancyToolbarSettingsByMonitor;
    wall: SeelenWallSettingsByMonitor;
    weg: SeelenWegSettingsByMonitor;
    wm: WindowManagerSettingsByMonitor;
    /** list of settings by workspace on this monitor */
    workspacesV2: WorkspaceConfiguration[];
}
//# sourceMappingURL=settings_by_monitor.d.ts.map