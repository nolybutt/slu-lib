use std::ops::{Deref, DerefMut};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::resource::{ResourceId, ResourceMetadata};

use super::declaration::WidgetSettingsDeclarationList;

#[derive(Debug, Clone, Default, Hash, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
pub struct WidgetId(ResourceId);

impl WidgetId {
    pub fn known_weg() -> Self {
        "@seelen/weg".into()
    }
    pub fn known_toolbar() -> Self {
        "@seelen/fancy-toolbar".into()
    }
    pub fn known_wm() -> Self {
        "@seelen/window-manager".into()
    }
    pub fn known_launcher() -> Self {
        "@seelen/launcher".into()
    }
    pub fn known_wall() -> Self {
        "@seelen/wallpaper-manager".into()
    }
}

impl Deref for WidgetId {
    type Target = ResourceId;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for WidgetId {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<&str> for WidgetId {
    fn from(value: &str) -> Self {
        Self(ResourceId::from(value))
    }
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct Widget {
    /// Resource id ex: `@seelen/weg`
    pub id: WidgetId,
    /// Optional icon to be used on settings. This have to be a valid react icon name.\
    /// You can find all icons here: https://react-icons.github.io/react-icons/.
    pub icon: Option<String>,
    /// Widget metadata, as texts, tags, images, etc.
    pub metadata: ResourceMetadata,
    /// How many instances are allowed of this widget.
    pub instances: WidgetInstanceType,
    /// Widget settings declaration, this is esentially a struct to be used by an
    /// builder to create the widget settings UI on the Settings window.
    pub settings: WidgetSettingsDeclarationList,
    /// Optional widget js code
    pub js: Option<String>,
    /// Optional widget css
    pub css: Option<String>,
    /// Optional widget html
    pub html: Option<String>,
}

#[derive(Debug, Clone, Copy, Default, Serialize, Deserialize, JsonSchema, TS)]
pub enum WidgetInstanceType {
    /// Default behavior, only one instance of this widget is allowed.
    /// This is useful for widgets intended to work as custom config window.
    #[default]
    Single,
    /// The widget is allowed to have multiple instances.\
    /// This allow to the user manually create more instances of this same widget.
    Multiple,
    /// Seelen UI will create an instance of this widget per each monitor connected.\
    /// This can be configured by the user using per monitor settings.\
    ReplicaByMonitor,
}
