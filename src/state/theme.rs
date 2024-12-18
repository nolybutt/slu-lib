use std::collections::HashMap;

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::WidgetId;

#[derive(Debug, Clone, Default, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
pub struct ThemeInfo {
    /// Display name of the theme
    pub display_name: String,
    /// Author of the theme
    pub author: String,
    /// Description of the theme
    pub description: String,
    /// Filename of the theme, is overridden by the program on load.
    pub filename: String,
    /// Tags to be used in search
    pub tags: Vec<String>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct Theme {
    /// Metadata about the theme
    pub info: ThemeInfo,
    /// Css Styles of the theme
    pub styles: HashMap<WidgetId, String>,
}
