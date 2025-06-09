use std::{
    collections::HashMap,
    path::{Path, PathBuf},
};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::{
    error::Result,
    resource::{ConcreteResource, ResourceId, ResourceMetadata, SluResourceFile},
};

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
    /// Special icon used when some other icon is not found
    pub missing: Option<Icon>,
    #[deprecated = "Will be removed on v3.0.0"]
    #[serde(alias = "apps", skip_serializing)]
    #[ts(skip)]
    pub old_apps: HashMap<String, Icon>,
    #[deprecated = "Will be removed on v3.0.0"]
    #[serde(alias = "files", skip_serializing)]
    #[ts(skip)]
    pub old_files: HashMap<String, Icon>,
    #[deprecated = "Will be removed on v3.0.0"]
    #[serde(alias = "specific", skip_serializing)]
    #[ts(skip)]
    pub old_custom: HashMap<String, Icon>,
    /// Key can be user model id, filename or a full path.
    /// In case of path this should be an executable or a lnk file, otherwise use `files`.
    ///
    /// Value is the path to the icon relative to the icon pack folder.
    pub app_entries: Vec<AppIconPackEntry>,
    /// Intended to store file icons by extension
    pub file_entries: Vec<FileIconPackEntry>,
    /// Here specific/custom icons for widgets can be stored.
    /// we recomend following the widget id + icon name to avoid collisions
    /// e.g. "@username/widgetid::iconname" but you can use whatever you want
    pub custom_entries: Vec<CustomIconPackEntry>,
}

impl IconPack {
    /// Migrates deprecated fields to the new structure
    #[allow(deprecated)]
    pub fn migrate(&mut self) {
        for (key, icon) in self.old_apps.drain() {
            let entry = AppIconPackEntry {
                umid: if Self::is_umid(&key) {
                    Some(key.clone())
                } else {
                    None
                },
                path: PathBuf::from(&key),
                icon,
            };
            self.app_entries.push(entry);
        }

        for (extension, icon) in self.old_files.drain() {
            let entry = FileIconPackEntry { extension, icon };
            self.file_entries.push(entry);
        }

        for (key, icon) in self.old_custom.drain() {
            let entry = CustomIconPackEntry { key, icon };
            self.custom_entries.push(entry);
        }
    }

    /// Helper function to check if a key looks like a UMID
    fn is_umid(key: &str) -> bool {
        // UMIDs typically follow patterns like:
        // - com.example.app
        // - org.organization.app
        // - Microsoft.Windows.App_8wekyb3d8bbwe!App
        (key.contains('.') || (key.contains('_') && key.contains('!')))
            && !key.contains(std::path::MAIN_SEPARATOR)
    }

    fn load_from_file(path: &Path) -> Result<Self> {
        let extension = path
            .extension()
            .ok_or("Invalid icon pack path extension")?
            .to_string_lossy();

        let icon_pack = match extension.as_ref() {
            "yml" | "yaml" => serde_yaml::from_reader(std::fs::File::open(path)?)?,
            "slu" => match SluResourceFile::load(path)?.concrete()? {
                ConcreteResource::IconPack(resource) => resource,
                _ => return Err("Resource file is not a icon pack".into()),
            },
            _ => {
                return Err("Invalid icon pack path extension".into());
            }
        };
        Ok(icon_pack)
    }

    fn load_from_folder(path: &Path) -> Result<Self> {
        let mut resource = Self::load_from_file(&path.join("metadata.yml"))?;
        resource.metadata.filename = path.file_name().unwrap().to_string_lossy().to_string();
        Ok(resource)
    }

    pub fn load(&self, path: &Path) -> Result<Self> {
        let icon_pack = if path.is_dir() {
            Self::load_from_folder(path)
        } else {
            Self::load_from_file(path)
        }?;
        Ok(icon_pack)
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
pub struct AppIconPackEntry {
    /// Application user model id
    #[serde(skip_serializing_if = "Option::is_none")]
    pub umid: Option<String>,
    /// Path or filename of the application
    pub path: PathBuf,
    pub icon: Icon,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
pub struct FileIconPackEntry {
    pub extension: String,
    pub icon: Icon,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
pub struct CustomIconPackEntry {
    pub key: String,
    pub icon: Icon,
}

#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize, JsonSchema, TS)]
pub enum Icon {
    /// In case of path be a lnk file this can be set to a different location to use the icon from.
    Redirect(PathBuf),
    /// Value is the path to the icon relative to the icon pack folder.
    #[serde(untagged)]
    Static(PathBuf),
    #[serde(untagged)]
    Dynamic(DynamicIcon),
}

#[derive(Debug, Default, PartialEq, Eq, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
pub struct DynamicIcon {
    /// Icon to use when system theme is light\
    /// Value is the path to the icon relative to the icon pack folder.
    light: PathBuf,
    /// Icon to use when system theme is dark\
    /// Value is the path to the icon relative to the icon pack folder.
    dark: PathBuf,
    /// Mask to be applied over the icon, themes can use this to apply custom colors over the icon.\
    /// Set it to `null` to disable masking. \
    /// Value is the path to the icon relative to the icon pack folder.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    mask: Option<PathBuf>,
}
