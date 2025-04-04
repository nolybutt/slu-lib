use std::{collections::HashMap, path::PathBuf};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::resource::{ResourceId, ResourceMetadata};

#[derive(Debug, Clone, Default, Hash, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
pub struct IconPackId(ResourceId);

impl std::ops::Deref for IconPackId {
    type Target = ResourceId;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl std::ops::DerefMut for IconPackId {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<&str> for IconPackId {
    fn from(value: &str) -> Self {
        Self(ResourceId::from(value))
    }
}

#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(untagged)]
pub enum Icon {
    /// Value is the path to the icon relative to the icon pack folder.
    Static(PathBuf),
    Dynamic {
        /// Icon to use when system theme is light\
        /// Value is the path to the icon relative to the icon pack folder.
        light: PathBuf,
        /// Icon to use when system theme is dark\
        /// Value is the path to the icon relative to the icon pack folder.
        dark: PathBuf,
        /// Mask to be applied over the icon, themes can use this to apply custom colors over the icon.\
        /// Set it to `null` to disable masking. \
        /// Value is the path to the icon relative to the icon pack folder.
        mask: Option<PathBuf>,
    },
}

#[derive(Debug, Default, PartialEq, Eq, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct IconPack {
    pub id: IconPackId,
    #[serde(alias = "info")]
    pub metadata: ResourceMetadata,
    /// Special icon used when some other icon is not found
    pub missing: Option<Icon>,
    /// Key can be user model id, filename or a full path.
    /// In case of path this should be an executable or a lnk file, otherwise use `files`.
    ///
    /// Value is the path to the icon relative to the icon pack folder.
    pub apps: HashMap<String, Icon>,
    /// Intended to store file icons by extension
    ///
    /// Key is the extension, value is the relative path to the icon
    pub files: HashMap<String, Icon>,
    /// Here specific icons for widgets can be stored.
    /// we recomend following the widget id + icon name to avoid collisions
    /// e.g. "@username/widgetid::iconname" but you can use whatever you want
    pub specific: HashMap<String, Icon>,
}
