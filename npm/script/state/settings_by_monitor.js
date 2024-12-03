"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorConfiguration = exports.WorkspaceConfiguration = exports.WorkspaceIdentifier = exports.WorkspaceIdentifierType = exports.SeelenWallSettingsByMonitor = exports.WindowManagerSettingsByMonitor = exports.SeelenWegSettingsByMonitor = exports.FancyToolbarSettingsByMonitor = void 0;
class FancyToolbarSettingsByMonitor {
    enabled = true;
}
exports.FancyToolbarSettingsByMonitor = FancyToolbarSettingsByMonitor;
class SeelenWegSettingsByMonitor {
    enabled = true;
}
exports.SeelenWegSettingsByMonitor = SeelenWegSettingsByMonitor;
class WindowManagerSettingsByMonitor {
    enabled = true;
    padding = null;
    margin = null;
    gap = null;
    layout = null;
}
exports.WindowManagerSettingsByMonitor = WindowManagerSettingsByMonitor;
class SeelenWallSettingsByMonitor {
    enabled = true;
    backgrounds = null;
}
exports.SeelenWallSettingsByMonitor = SeelenWallSettingsByMonitor;
var WorkspaceIdentifierType;
(function (WorkspaceIdentifierType) {
    WorkspaceIdentifierType["Name"] = "name";
    WorkspaceIdentifierType["Index"] = "index";
})(WorkspaceIdentifierType || (exports.WorkspaceIdentifierType = WorkspaceIdentifierType = {}));
class WorkspaceIdentifier {
    id;
    kind;
    constructor(id, kind) {
        this.id = id;
        this.kind = kind;
    }
}
exports.WorkspaceIdentifier = WorkspaceIdentifier;
class WorkspaceConfiguration {
    identifier;
    layout = null;
    backgrounds = null;
    constructor(identifier) {
        this.identifier = identifier;
    }
}
exports.WorkspaceConfiguration = WorkspaceConfiguration;
class MonitorConfiguration {
    tb = new FancyToolbarSettingsByMonitor();
    wall = new SeelenWallSettingsByMonitor();
    weg = new SeelenWegSettingsByMonitor();
    wm = new WindowManagerSettingsByMonitor();
    /** list of settings by workspace on this monitor */
    workspacesV2 = [];
}
exports.MonitorConfiguration = MonitorConfiguration;
