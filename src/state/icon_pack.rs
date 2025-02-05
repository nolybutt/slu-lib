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

#[derive(Debug, Default, PartialEq, Eq, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct IconPack {
    pub id: IconPackId,
    #[serde(alias = "info")]
    pub metadata: ResourceMetadata,
    /// Key can be user model id, filename or a full path.
    /// In case of path this should be an executable or a lnk file, otherwise use `files`.
    ///
    /// Value is the path to the icon relative to the icon pack folder.
    pub apps: HashMap<String, PathBuf>,
    /// Intended to store file icons by extension
    ///
    /// Key is the extension, value is the relative path to the icon
    pub files: HashMap<String, PathBuf>,
}
