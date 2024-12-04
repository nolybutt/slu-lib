import * as dntShim from "../_dnt.shims.js";
import { Obtainable, SeelenCommand, SeelenEvent } from '../handlers/index.js';
import { Rect } from '../utils/index.js';
import { MonitorConfiguration } from './settings_by_monitor.js';
export var VirtualDesktopStrategy;
(function (VirtualDesktopStrategy) {
    VirtualDesktopStrategy["Native"] = "Native";
    VirtualDesktopStrategy["Seelen"] = "Seelen";
})(VirtualDesktopStrategy || (VirtualDesktopStrategy = {}));
export var SeelenWegMode;
(function (SeelenWegMode) {
    SeelenWegMode["FullWidth"] = "Full-Width";
    SeelenWegMode["MinContent"] = "Min-Content";
})(SeelenWegMode || (SeelenWegMode = {}));
export var HideMode;
(function (HideMode) {
    HideMode["Never"] = "Never";
    HideMode["Always"] = "Always";
    HideMode["OnOverlap"] = "On-Overlap";
})(HideMode || (HideMode = {}));
export var SeelenWegSide;
(function (SeelenWegSide) {
    SeelenWegSide["Left"] = "Left";
    SeelenWegSide["Right"] = "Right";
    SeelenWegSide["Top"] = "Top";
    SeelenWegSide["Bottom"] = "Bottom";
})(SeelenWegSide || (SeelenWegSide = {}));
export class SeelenWallWallpaper {
    id = dntShim.crypto.randomUUID();
    path = '';
}
export class SeelenWallSettings {
    enabled = true;
    backgrounds = [];
    /** Interval in seconds */
    interval = 60;
    randomize = false;
}
export var SeelenLauncherMonitor;
(function (SeelenLauncherMonitor) {
    SeelenLauncherMonitor["Primary"] = "Primary";
    SeelenLauncherMonitor["MouseOver"] = "Mouse-Over";
})(SeelenLauncherMonitor || (SeelenLauncherMonitor = {}));
export class SeelenLauncherRunner {
    id = dntShim.crypto.randomUUID();
    label = '';
    program = '';
    readonly = false;
}
export class SeelenLauncherSettings {
    enabled = false;
    monitor = SeelenLauncherMonitor.MouseOver;
    runners = [];
}
export var UpdateChannel;
(function (UpdateChannel) {
    UpdateChannel["Release"] = "Release";
    UpdateChannel["Beta"] = "Beta";
    UpdateChannel["Nightly"] = "Nightly";
})(UpdateChannel || (UpdateChannel = {}));
export class UpdaterSettings {
    channel = UpdateChannel.Nightly;
}
const _Settings = Obtainable(SeelenCommand.StateGetSettings, SeelenEvent.StateSettingsChanged);
export class Settings {
    fancyToolbar = new FancyToolbarSettings();
    seelenweg = new SeelenWegSettings();
    windowManager = new WindowManagerSettings();
    wall = new SeelenWallSettings();
    launcher = new SeelenLauncherSettings();
    monitors = [new MonitorConfiguration()];
    ahkEnabled = true;
    ahkVariables = new AhkVarList();
    selectedThemes = ['default'];
    iconPacks = ['system'];
    devTools = false;
    language = '';
    dateFormat = 'ddd D MMM, hh:mm A';
    virtualDesktopStrategy = VirtualDesktopStrategy.Native;
    updater = new UpdaterSettings();
    static async getAsync() {
        return await _Settings.getAsync();
    }
    static async onChange(cb) {
        return await _Settings.onChange(cb);
    }
}
export class FancyToolbarSettings {
    enabled = true;
    height = 30;
    placeholder = 'default.yml';
    hideMode = HideMode.Never;
    delayToShow = 100;
    delayToHide = 800;
}
export class SeelenWegSettings {
    enabled = true;
    mode = SeelenWegMode.MinContent;
    hideMode = HideMode.OnOverlap;
    position = SeelenWegSide.Bottom;
    visibleSeparators = true;
    size = 40;
    zoomSize = 70;
    margin = 8;
    padding = 8;
    spaceBetweenItems = 8;
    delayToShow = 100;
    delayToHide = 800;
}
export class Border {
    enabled = true;
    width = 3.0;
    offset = 0.0;
}
export class FloatingWindowSettings {
    width = 800.0;
    height = 500.0;
}
export class WindowManagerSettings {
    enabled = false;
    autoStackingByCategory = true;
    border = new Border();
    resizeDelta = 10.0;
    workspaceGap = 10.0;
    workspacePadding = 10.0;
    workspaceMargin = new Rect();
    floating = new FloatingWindowSettings();
    defaultLayout = 'default.yml';
}
export class AhkVar {
    fancy;
    ahk;
    readonly = false;
    constructor(fancy = '', ahk = '') {
        this.fancy = fancy;
        this.ahk = ahk;
    }
}
/// TODO: find the way to avoid duplicated code between rust and this class
export class AhkVarList {
    // launcher
    toggleLauncher = new AhkVar('Win + Space', 'LWin & Space');
    // wm
    reserveTop = new AhkVar('Win + Shift + I', '#+i');
    reserveBottom = new AhkVar('Win + Shift + K', '#+k');
    reserveLeft = new AhkVar('Win + Shift + J', '#+j');
    reserveRight = new AhkVar('Win + Shift + L', '#+l');
    reserveFloat = new AhkVar('Win + Shift + U', '#+u');
    reserveStack = new AhkVar('Win + Shift + O', '#+o');
    focusTop = new AhkVar('Win + Shift + W', '#+w');
    focusBottom = new AhkVar('Win + Shift + S', '#+s');
    focusLeft = new AhkVar('Win + Shift + A', '#+a');
    focusRight = new AhkVar('Win + Shift + D', '#+d');
    focusLatest = new AhkVar('Win + Shift + E', '#+e');
    increaseWidth = new AhkVar('Win + Alt + =', '#!=');
    decreaseWidth = new AhkVar('Win + Alt + -', '#!-');
    increaseHeight = new AhkVar('Win + Shift + =', '#+=');
    decreaseHeight = new AhkVar('Win + Shift + -', '#+-');
    restoreSizes = new AhkVar('Win + Alt + 0', '#!0');
    // virtual desktops
    switchWorkspace0 = new AhkVar('Alt + 1', '!1');
    switchWorkspace1 = new AhkVar('Alt + 2', '!2');
    switchWorkspace2 = new AhkVar('Alt + 3', '!3');
    switchWorkspace3 = new AhkVar('Alt + 4', '!4');
    switchWorkspace4 = new AhkVar('Alt + 5', '!5');
    switchWorkspace5 = new AhkVar('Alt + 6', '!6');
    switchWorkspace6 = new AhkVar('Alt + 7', '!7');
    switchWorkspace7 = new AhkVar('Alt + 8', '!8');
    switchWorkspace8 = new AhkVar('Alt + 9', '!9');
    switchWorkspace9 = new AhkVar('Alt + 0', '!0');
    moveToWorkspace0 = new AhkVar('Alt + Shift + 1', '!+1');
    moveToWorkspace1 = new AhkVar('Alt + Shift + 2', '!+2');
    moveToWorkspace2 = new AhkVar('Alt + Shift + 3', '!+3');
    moveToWorkspace3 = new AhkVar('Alt + Shift + 4', '!+4');
    moveToWorkspace4 = new AhkVar('Alt + Shift + 5', '!+5');
    moveToWorkspace5 = new AhkVar('Alt + Shift + 6', '!+6');
    moveToWorkspace6 = new AhkVar('Alt + Shift + 7', '!+7');
    moveToWorkspace7 = new AhkVar('Alt + Shift + 8', '!+8');
    moveToWorkspace8 = new AhkVar('Alt + Shift + 9', '!+9');
    moveToWorkspace9 = new AhkVar('Alt + Shift + 0', '!+0');
    sendToWorkspace0 = new AhkVar('Win + Shift + 1', '#+1');
    sendToWorkspace1 = new AhkVar('Win + Shift + 2', '#+2');
    sendToWorkspace2 = new AhkVar('Win + Shift + 3', '#+3');
    sendToWorkspace3 = new AhkVar('Win + Shift + 4', '#+4');
    sendToWorkspace4 = new AhkVar('Win + Shift + 5', '#+5');
    sendToWorkspace5 = new AhkVar('Win + Shift + 6', '#+6');
    sendToWorkspace6 = new AhkVar('Win + Shift + 7', '#+7');
    sendToWorkspace7 = new AhkVar('Win + Shift + 8', '#+8');
    sendToWorkspace8 = new AhkVar('Win + Shift + 9', '#+9');
    sendToWorkspace9 = new AhkVar('Win + Shift + 0', '#+0');
    // miscellaneous
    miscOpenSettings = new AhkVar('Win + K', '#k');
    miscToggleLockTracing = new AhkVar('Ctrl + Win + Alt + T', '^#!t');
    miscToggleWinEventTracing = new AhkVar('Ctrl + Win + Alt + L', '^#!l');
}
