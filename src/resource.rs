use std::{
    collections::HashMap,
    fs::File,
    hash::Hash,
    io::{Read, Write},
    path::Path,
    sync::OnceLock,
};

use base64::Engine;
use chrono::{DateTime, Utc};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use url::Url;
use uuid::Uuid;

use crate::{
    error::Result,
    state::{IconPack, Plugin, Theme, Widget},
};

#[derive(
    Debug, Clone, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, JsonSchema, TS,
)]
/// visual id composed of the creator username and the resource name
pub struct ResourceId(String);

static REGEX: OnceLock<regex::Regex> = OnceLock::new();

impl ResourceId {
    fn regex() -> &'static regex::Regex {
        REGEX.get_or_init(|| regex::Regex::new("^@[\\w\\-]{3,32}\\/[\\w\\-]+\\w$").unwrap())
    }

    pub fn is_valid(&self) -> bool {
        Self::regex().is_match(&self.0)
    }

    /// Creator username of the resource
    ///
    /// # Safety
    ///
    /// The string is a valid resource id
    pub fn creator(&self) -> String {
        self.0
            .split('/')
            .next()
            .unwrap()
            .trim_start_matches('@')
            .to_string()
    }

    /// Name of the resource
    ///
    /// # Safety
    ///
    /// The string is a valid resource id
    pub fn name(&self) -> String {
        self.0.split('/').next_back().unwrap().to_string()
    }
}

impl Default for ResourceId {
    fn default() -> Self {
        Self("@unknown/unknown".to_owned())
    }
}

impl std::ops::Deref for ResourceId {
    type Target = String;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl std::ops::DerefMut for ResourceId {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<String> for ResourceId {
    fn from(value: String) -> Self {
        Self(value)
    }
}

impl From<&String> for ResourceId {
    fn from(value: &String) -> Self {
        Self(value.clone())
    }
}

impl From<&str> for ResourceId {
    fn from(value: &str) -> Self {
        Self(value.to_owned())
    }
}

impl std::fmt::Display for ResourceId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

// =============================================================================

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(untagged)]
pub enum ResourceText {
    En(String),
    Localized(HashMap<String, String>),
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
pub struct ResourceMetadata {
    /// Map of language code to display name. Could be a string, mapped to `en`.
    pub display_name: ResourceText,
    /// Map of language code to description. Could be a string, mapped to `en`.
    pub description: ResourceText,
    pub portrait: Option<Url>,
    pub screenshots: Vec<Url>,
    pub tags: Vec<String>,
    #[serde(skip_deserializing)]
    pub filename: String,
    #[serde(skip_deserializing)]
    pub bundled: bool,
}

impl Default for ResourceMetadata {
    fn default() -> Self {
        Self {
            display_name: ResourceText::Localized(HashMap::new()),
            description: ResourceText::Localized(HashMap::new()),
            portrait: None,
            screenshots: Vec::new(),
            tags: Vec::new(),
            filename: String::new(),
            bundled: false,
        }
    }
}

// =============================================================================

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
pub enum ResourceKind {
    Theme,
    IconPack,
    Widget,
    Plugin,
    Wallpaper,
    SoundPack,
}

// =============================================================================

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
pub enum ResourceStatus {
    /// Initial state
    Draft,
    /// Waiting for review
    Reviewing,
    /// review done and rejected
    Rejected,
    /// review done and approved
    Published,
    /// soft delete by user
    Deleted,
}

// =============================================================================

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct Resource {
    pub id: Uuid,
    pub creator_id: Uuid,
    /// visual id composed of creator username and resource name
    pub friendly_id: ResourceId,
    pub metadata: ResourceMetadata,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub status: ResourceStatus,
    pub rejected_reason: Option<String>,
    pub reviewed_at: Option<DateTime<Utc>>,
    pub reviewed_by: Option<Uuid>,
    /// should be filled if `status == ResourceStatus::Deleted`
    pub deleted_at: Option<DateTime<Utc>>,
    pub version: u32,
    pub kind: ResourceKind,
    /// id of the document containing the resource
    pub data_id: Uuid,
    pub stars: u32,
    pub downloads: u32,
}

impl Resource {
    pub fn verify(&self) -> Result<()> {
        if !self.friendly_id.is_valid() {
            return Err("invalid resource id".into());
        }

        if let ResourceText::Localized(map) = &self.metadata.display_name {
            if map.get("en").is_none() {
                return Err("missing mandatory english display name".into());
            }
        }

        if let ResourceText::Localized(map) = &self.metadata.description {
            if map.get("en").is_none() {
                return Err("missing mandatory english description".into());
            }
        }
        Ok(())
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct SluResourceFile {
    pub version: u32,
    pub resource: Resource,
    pub data: serde_json::Value,
}

pub enum ConcreteResource {
    Theme(Theme),
    Plugin(Plugin),
    IconPack(IconPack),
    Widget(Widget),
}

impl SluResourceFile {
    pub fn load(path: &Path) -> Result<Self> {
        let mut file = File::open(path)?;

        let mut header = [0u8; 4];
        file.read_exact(&mut header)?;

        let [_version, _reserved1, _reserved2, _reserved3] = header;

        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer)?;
        let decoded = base64::engine::general_purpose::STANDARD.decode(&buffer)?;
        Ok(serde_yaml::from_slice(&decoded)?)
    }

    pub fn store(&self, path: &Path) -> Result<()> {
        let mut file = File::create(path)?;
        let data = serde_yaml::to_string(self)?;
        let encoded = base64::engine::general_purpose::STANDARD.encode(data);

        file.write_all(&[1, 0, 0, 0])?;
        file.write_all(encoded.as_bytes())?;
        Ok(())
    }

    pub fn concrete(&self) -> Result<ConcreteResource> {
        let mut resource = serde_json::value::Map::new();
        resource.insert(
            "id".to_string(),
            serde_json::Value::String(self.resource.friendly_id.to_string()),
        );
        resource.insert(
            "metadata".to_string(),
            serde_json::to_value(&self.resource.metadata)?,
        );

        let data = self.data.as_object().ok_or("invalid data")?;
        resource.append(&mut data.clone());

        let concrete = match self.resource.kind {
            ResourceKind::Theme => {
                ConcreteResource::Theme(serde_json::from_value(resource.into())?)
            }
            ResourceKind::Plugin => {
                ConcreteResource::Plugin(serde_json::from_value(resource.into())?)
            }
            ResourceKind::IconPack => {
                ConcreteResource::IconPack(serde_json::from_value(resource.into())?)
            }
            ResourceKind::Widget => {
                ConcreteResource::Widget(serde_json::from_value(resource.into())?)
            }
            _ => return Err("unsupported resource kind".into()),
        };

        Ok(concrete)
    }
}
