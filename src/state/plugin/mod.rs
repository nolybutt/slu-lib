pub mod value;

use std::ops::{Deref, DerefMut};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use value::PluginValue;

use crate::resource::{ResourceId, ResourceMetadata};

#[derive(Debug, Clone, Hash, Default, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
pub struct PluginId(ResourceId);

impl Deref for PluginId {
    type Target = ResourceId;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for PluginId {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<&str> for PluginId {
    fn from(value: &str) -> Self {
        Self(ResourceId::from(value))
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct Plugin {
    pub id: PluginId,
    pub metadata: ResourceMetadata,
    /// Optional icon to be used by the target of the plugin as icon.\
    /// This have to be a valid react icon name.\
    /// You can find all icons here: https://react-icons.github.io/react-icons/.
    #[serde(default = "Plugin::default_icon")]
    pub icon: String,
    #[serde(flatten)]
    pub plugin: PluginValue,
}

impl Plugin {
    pub fn default_icon() -> String {
        "PiPuzzlePieceDuotone".to_string()
    }
}
