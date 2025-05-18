use std::collections::HashMap;

use schemars::JsonSchema;

use crate::{state::WidgetId, utils::Flatenable};

use super::{
    FancyToolbarSettings, SeelenLauncherSettings, SeelenWallSettings, SeelenWegSettings,
    WindowManagerSettings,
};

#[derive(Clone, Debug, Default, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default)]
pub struct SettingsByWidget {
    #[serde(rename = "@seelen/weg")]
    pub weg: SeelenWegSettings,
    #[serde(rename = "@seelen/fancy-toolbar")]
    pub fancy_toolbar: FancyToolbarSettings,
    #[serde(rename = "@seelen/window-manager")]
    pub wm: WindowManagerSettings,
    #[serde(rename = "@seelen/wallpaper-manager")]
    pub wall: SeelenWallSettings,
    #[serde(rename = "@seelen/launcher")]
    pub launcher: SeelenLauncherSettings,
    #[serde(flatten)]
    pub others: Flatenable<HashMap<WidgetId, ThirdPartyWidgetSettings>>,
}

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
pub struct ThirdPartyWidgetSettings {
    /// enable or disable the widget
    pub enabled: bool,
    #[serde(flatten)]
    pub rest: Flatenable<HashMap<String, serde_json::Value>>,
}

impl Default for ThirdPartyWidgetSettings {
    fn default() -> Self {
        Self {
            enabled: true, // new widgets are enabled by default
            rest: Default::default(),
        }
    }
}
