import { invoke as tauriInvoke } from '@tauri-apps/api/core';
export var SeelenCommand;
(function (SeelenCommand) {
    // General
    SeelenCommand["Run"] = "run";
    SeelenCommand["IsDevMode"] = "is_dev_mode";
    SeelenCommand["OpenFile"] = "open_file";
    SeelenCommand["RunAsAdmin"] = "run_as_admin";
    SeelenCommand["SelectFileOnExplorer"] = "select_file_on_explorer";
    SeelenCommand["IsVirtualDesktopSupported"] = "is_virtual_desktop_supported";
    SeelenCommand["GetUserEnvs"] = "get_user_envs";
    SeelenCommand["ShowAppSettings"] = "show_app_settings";
    SeelenCommand["SwitchWorkspace"] = "switch_workspace";
    SeelenCommand["SendKeys"] = "send_keys";
    SeelenCommand["GetIcon"] = "get_icon";
    SeelenCommand["GetSystemColors"] = "get_system_colors";
    SeelenCommand["SimulateFullscreen"] = "simulate_fullscreen";
    SeelenCommand["CheckForUpdates"] = "check_for_updates";
    /** Restart the app after install the update so it returns a promise resolved with `never` */
    SeelenCommand["InstallLastAvailableUpdate"] = "install_last_available_update";
    // Seelen Settings
    SeelenCommand["SetAutoStart"] = "set_auto_start";
    SeelenCommand["GetAutoStartStatus"] = "get_auto_start_status";
    SeelenCommand["StateGetThemes"] = "state_get_themes";
    SeelenCommand["StateGetPlaceholders"] = "state_get_placeholders";
    SeelenCommand["StateGetLayouts"] = "state_get_layouts";
    SeelenCommand["StateGetWegItems"] = "state_get_weg_items";
    SeelenCommand["StateGetSettings"] = "state_get_settings";
    SeelenCommand["StateGetSpecificAppsConfigurations"] = "state_get_specific_apps_configurations";
    SeelenCommand["StateGetWallpaper"] = "state_get_wallpaper";
    SeelenCommand["StateSetWallpaper"] = "state_set_wallpaper";
    SeelenCommand["StateGetHistory"] = "state_get_history";
    SeelenCommand["StateGetPlugins"] = "state_get_plugins";
    SeelenCommand["StateGetWidgets"] = "state_get_widgets";
    SeelenCommand["stateGetProfiles"] = "state_get_profiles";
    // Media
    SeelenCommand["MediaPrev"] = "media_prev";
    SeelenCommand["MediaTogglePlayPause"] = "media_toggle_play_pause";
    SeelenCommand["MediaNext"] = "media_next";
    SeelenCommand["SetVolumeLevel"] = "set_volume_level";
    SeelenCommand["MediaToggleMute"] = "media_toggle_mute";
    SeelenCommand["MediaSetDefaultDevice"] = "media_set_default_device";
    // Brightness
    SeelenCommand["GetMainMonitorBrightness"] = "get_main_monitor_brightness";
    SeelenCommand["SetMainMonitorBrightness"] = "set_main_monitor_brightness";
    // Power
    SeelenCommand["LogOut"] = "log_out";
    SeelenCommand["Suspend"] = "suspend";
    SeelenCommand["Restart"] = "restart";
    SeelenCommand["Shutdown"] = "shutdown";
    // SeelenWeg
    SeelenCommand["WegCloseApp"] = "weg_close_app";
    SeelenCommand["WegToggleWindowState"] = "weg_toggle_window_state";
    SeelenCommand["WegRequestUpdatePreviews"] = "weg_request_update_previews";
    SeelenCommand["WegPinItem"] = "weg_pin_item";
    // Windows Manager
    SeelenCommand["SetWindowPosition"] = "set_window_position";
    SeelenCommand["RequestFocus"] = "request_focus";
    // App Launcher
    SeelenCommand["LauncherGetApps"] = "launcher_get_apps";
    // Tray Icons
    SeelenCommand["TempGetByEventTrayInfo"] = "temp_get_by_event_tray_info";
    SeelenCommand["OnClickTrayIcon"] = "on_click_tray_icon";
    SeelenCommand["OnContextMenuTrayIcon"] = "on_context_menu_tray_icon";
    // Network
    SeelenCommand["WlanGetProfiles"] = "wlan_get_profiles";
    SeelenCommand["WlanStartScanning"] = "wlan_start_scanning";
    SeelenCommand["WlanStopScanning"] = "wlan_stop_scanning";
    SeelenCommand["WlanConnect"] = "wlan_connect";
    SeelenCommand["WlanDisconnect"] = "wlan_disconnect";
    // Notifications
    SeelenCommand["NotificationsClose"] = "notifications_close";
    SeelenCommand["NotificationsCloseAll"] = "notifications_close_all";
})(SeelenCommand || (SeelenCommand = {}));
export function invoke(command, args, options) {
    return tauriInvoke(command, args, options);
}
