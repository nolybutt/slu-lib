export class FancyToolbarSettingsByMonitor {
    enabled = true;
}
export class SeelenWegSettingsByMonitor {
    enabled = true;
}
export class WindowManagerSettingsByMonitor {
    enabled = true;
    padding = null;
    margin = null;
    gap = null;
    layout = null;
}
export class SeelenWallSettingsByMonitor {
    enabled = true;
    backgrounds = null;
}
export var WorkspaceIdentifierType;
(function (WorkspaceIdentifierType) {
    WorkspaceIdentifierType["Name"] = "name";
    WorkspaceIdentifierType["Index"] = "index";
})(WorkspaceIdentifierType || (WorkspaceIdentifierType = {}));
export class WorkspaceIdentifier {
    id;
    kind;
    constructor(id, kind) {
        this.id = id;
        this.kind = kind;
    }
}
export class WorkspaceConfiguration {
    identifier;
    layout = null;
    backgrounds = null;
    constructor(identifier) {
        this.identifier = identifier;
    }
}
export class MonitorConfiguration {
    tb = new FancyToolbarSettingsByMonitor();
    wall = new SeelenWallSettingsByMonitor();
    weg = new SeelenWegSettingsByMonitor();
    wm = new WindowManagerSettingsByMonitor();
    /** list of settings by workspace on this monitor */
    workspacesV2 = [];
}
