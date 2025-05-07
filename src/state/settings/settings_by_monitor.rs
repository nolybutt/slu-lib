use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use ts_rs::TS;

use crate::{error::Result, rect::Rect, utils::FlatenableMap};

use super::{SeelenWallWallpaper, WegPinnedItemsVisibility, WegTemporalItemsVisibility, WidgetId};

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct FancyToolbarSettingsByMonitor {
    pub enabled: bool,
}

impl Default for FancyToolbarSettingsByMonitor {
    fn default() -> Self {
        Self { enabled: true }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct SeelenWegSettingsByMonitor {
    pub enabled: bool,
    pub temporal_items_visibility: Option<WegTemporalItemsVisibility>,
    pub pinned_items_visibility: Option<WegPinnedItemsVisibility>,
}

impl Default for SeelenWegSettingsByMonitor {
    fn default() -> Self {
        Self {
            enabled: true,
            temporal_items_visibility: None,
            pinned_items_visibility: None,
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct WindowManagerSettingsByMonitor {
    pub enabled: bool,
    pub padding: Option<u32>,
    pub margin: Option<Rect>,
    pub gap: Option<u32>,
    pub layout: Option<String>,
}

impl Default for WindowManagerSettingsByMonitor {
    fn default() -> Self {
        Self {
            enabled: true,
            padding: None,
            margin: None,
            gap: None,
            layout: None,
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct SeelenWallSettingsByMonitor {
    pub enabled: bool,
    pub backgrounds: Option<Vec<SeelenWallWallpaper>>,
}

impl Default for SeelenWallSettingsByMonitor {
    fn default() -> Self {
        Self {
            enabled: true,
            backgrounds: None,
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[ts(export)]
pub enum WorkspaceIdentifierType {
    #[serde(alias = "name")]
    Name,
    #[serde(alias = "index")]
    Index,
}

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct WorkspaceIdentifier {
    pub id: String,
    pub kind: WorkspaceIdentifierType,
}

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct WorkspaceConfiguration {
    pub identifier: WorkspaceIdentifier,
    pub layout: Option<String>,
    pub backgrounds: Option<Vec<SeelenWallWallpaper>>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, JsonSchema, TS)]
pub struct MonitorSettingsByWidget {
    #[serde(rename = "@seelen/weg")]
    pub weg: SeelenWegSettingsByMonitor,
    #[serde(rename = "@seelen/fancy-toolbar")]
    pub fancy_toolbar: FancyToolbarSettingsByMonitor,
    #[serde(rename = "@seelen/window-manager")]
    pub wm: WindowManagerSettingsByMonitor,
    #[serde(rename = "@seelen/wallpaper-manager")]
    pub wall: SeelenWallSettingsByMonitor,
    #[serde(flatten)]
    pub others: FlatenableMap<WidgetId, HashMap<String, serde_json::Value>>,
}

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
pub struct MonitorConfiguration {
    /// @deprecated since v2.1.0, will be removed in v3.0.0
    #[ts(skip)]
    #[serde(skip_serializing)]
    tb: Option<FancyToolbarSettingsByMonitor>,
    /// @deprecated since v2.1.0, will be removed in v3.0.0
    #[ts(skip)]
    #[serde(skip_serializing)]
    weg: Option<SeelenWegSettingsByMonitor>,
    /// @deprecated since v2.1.0, will be removed in v3.0.0
    #[ts(skip)]
    #[serde(skip_serializing)]
    wm: Option<WindowManagerSettingsByMonitor>,
    /// @deprecated since v2.1.0, will be removed in v3.0.0
    #[ts(skip)]
    #[serde(skip_serializing)]
    wall: Option<SeelenWallSettingsByMonitor>,
    // ---
    /// dictionary of settings by widget
    pub by_widget: MonitorSettingsByWidget,
    /// list of settings by workspace on this monitor
    pub workspaces_v2: Vec<WorkspaceConfiguration>,
}

impl Default for MonitorConfiguration {
    fn default() -> Self {
        Self {
            tb: None,
            weg: None,
            wm: None,
            wall: None,
            by_widget: MonitorSettingsByWidget::default(),
            workspaces_v2: Vec::new(),
        }
    }
}

impl MonitorConfiguration {
    /// Migrate old settings (before v2.1.0) (will be removed in v3.0.0)
    pub fn migrate(&mut self) -> Result<()> {
        let dict = &mut self.by_widget;
        if let Some(tb) = self.tb.take() {
            dict.fancy_toolbar = tb;
        }
        if let Some(weg) = self.weg.take() {
            dict.weg = weg;
        }
        if let Some(wm) = self.wm.take() {
            dict.wm = wm;
        }
        if let Some(wall) = self.wall.take() {
            dict.wall = wall;
        }
        Ok(())
    }

    pub fn sanitize(&mut self) -> Result<()> {
        Ok(())
    }
}
