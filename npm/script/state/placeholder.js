"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTMSubType = exports.TimeUnit = exports.WorkspaceTMMode = exports.ToolbarModuleType = void 0;
var ToolbarModuleType;
(function (ToolbarModuleType) {
    ToolbarModuleType["Generic"] = "generic";
    ToolbarModuleType["Text"] = "text";
    ToolbarModuleType["Date"] = "date";
    ToolbarModuleType["Power"] = "power";
    ToolbarModuleType["Settings"] = "settings";
    ToolbarModuleType["Network"] = "network";
    ToolbarModuleType["Workspaces"] = "workspaces";
    ToolbarModuleType["Media"] = "media";
    ToolbarModuleType["Tray"] = "tray";
    ToolbarModuleType["Device"] = "device";
    ToolbarModuleType["Notifications"] = "notifications";
})(ToolbarModuleType || (exports.ToolbarModuleType = ToolbarModuleType = {}));
var WorkspaceTMMode;
(function (WorkspaceTMMode) {
    WorkspaceTMMode["Dotted"] = "dotted";
    WorkspaceTMMode["Named"] = "named";
    WorkspaceTMMode["Numbered"] = "numbered";
})(WorkspaceTMMode || (exports.WorkspaceTMMode = WorkspaceTMMode = {}));
var TimeUnit;
(function (TimeUnit) {
    TimeUnit["SECOND"] = "second";
    TimeUnit["MINUTE"] = "minute";
    TimeUnit["HOUR"] = "hour";
    TimeUnit["DAY"] = "day";
})(TimeUnit || (exports.TimeUnit = TimeUnit = {}));
var DeviceTMSubType;
(function (DeviceTMSubType) {
    DeviceTMSubType["Disk"] = "disk";
    DeviceTMSubType["CPU"] = "cpu";
    DeviceTMSubType["Memory"] = "memory";
})(DeviceTMSubType || (exports.DeviceTMSubType = DeviceTMSubType = {}));
