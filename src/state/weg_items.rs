use std::{collections::HashSet, path::PathBuf};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
pub struct WegAppGroupItem {
    pub title: String,
    pub handle: isize,
}

#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
pub enum WegItemSubtype {
    File,
    Folder,
    App,
    /// this is used for backward compatibility, will be removed in v3
    #[default]
    UnknownV2_1_6,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
pub struct PinnedWegItemData {
    /// internal UUID to differentiate items
    pub id: String,
    /// Subtype of the item (mandatory, but is optional for backward compatibility)
    #[serde(default)]
    pub subtype: WegItemSubtype,
    /// Application user model id.
    pub umid: Option<String>,
    /// path to file, forder or program.
    pub path: PathBuf,
    /// literal command to be executed via CMD.
    pub relaunch_command: String,
    /// path where ejecute the relaunch command
    pub relaunch_in: Option<PathBuf>,
    /// display name of the item
    pub display_name: String,
    /// @deprecated, use subtype `Folder` instead will be removed in v3
    #[ts(skip)]
    #[serde(default, skip_serializing)]
    pub is_dir: bool,
    /// Window handles in the app group, in case of pinned file/dir always will be empty
    #[serde(default, skip_deserializing)]
    pub windows: Vec<WegAppGroupItem>,
    /// This intention is to prevent pinned state change, when this is neccesary
    #[serde(default, skip_deserializing)]
    pub pin_disabled: bool,
}

impl PinnedWegItemData {
    pub fn set_pin_disabled(&mut self, pin_disabled: bool) {
        self.pin_disabled = pin_disabled;
    }

    /// Some apps changes of place on update, commonly this contains an App User Model Id
    /// the path should be updated to the new location on these cases.
    pub fn should_ensure_path(&self) -> bool {
        self.umid.is_none() || self.path.extension().map_or(false, |ext| ext == "lnk")
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(tag = "type")]
pub enum WegItem {
    #[serde(alias = "PinnedApp")]
    Pinned(PinnedWegItemData),
    Temporal(PinnedWegItemData),
    Separator {
        id: String,
    },
    Media {
        id: String,
    },
    StartMenu {
        id: String,
    },
}

impl WegItem {
    pub fn id(&self) -> &String {
        match self {
            WegItem::Pinned(data) => &data.id,
            WegItem::Temporal(data) => &data.id,
            WegItem::Separator { id } => id,
            WegItem::Media { id } => id,
            WegItem::StartMenu { id } => id,
        }
    }

    fn set_id(&mut self, identifier: String) {
        match self {
            WegItem::Pinned(data) => data.id = identifier,
            WegItem::Temporal(data) => data.id = identifier,
            WegItem::Separator { id } => *id = identifier,
            WegItem::Media { id } => *id = identifier,
            WegItem::StartMenu { id } => *id = identifier,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct WegItems {
    /// Whether the reordering possible on the weg
    pub is_reorder_disabled: bool,
    pub left: Vec<WegItem>,
    pub center: Vec<WegItem>,
    pub right: Vec<WegItem>,
}

impl Default for WegItems {
    fn default() -> Self {
        Self {
            is_reorder_disabled: false,
            left: vec![WegItem::StartMenu { id: String::new() }],
            center: vec![WegItem::Pinned(PinnedWegItemData {
                id: String::new(),
                umid: None,
                subtype: WegItemSubtype::App,
                path: "C:\\Windows\\explorer.exe".into(),
                display_name: "Explorer".into(),
                relaunch_command: "C:\\Windows\\explorer.exe".into(),
                relaunch_in: None,
                is_dir: false,
                windows: vec![],
                pin_disabled: false,
            })],
            right: vec![WegItem::Media { id: String::new() }],
        }
    }
}

impl WegItems {
    fn sanitize_items(dict: &mut HashSet<String>, items: Vec<WegItem>) -> Vec<WegItem> {
        let mut result = Vec::new();
        for mut item in items {
            match &mut item {
                WegItem::Pinned(data) => {
                    if data.should_ensure_path() && !data.path.exists() {
                        continue;
                    }
                    if data.relaunch_command.is_empty() {
                        data.relaunch_command = data.path.to_string_lossy().to_string();
                    }

                    // migration step for items before v2.1.6
                    if data.subtype == WegItemSubtype::UnknownV2_1_6 {
                        data.subtype = if data.is_dir {
                            WegItemSubtype::Folder
                        } else if data.relaunch_command.to_lowercase().contains(".exe") {
                            WegItemSubtype::App
                        } else {
                            WegItemSubtype::File
                        };
                    }
                }
                WegItem::Temporal(data) => {
                    if data.windows.is_empty() || (data.should_ensure_path() && !data.path.exists())
                    {
                        continue;
                    }
                    if data.relaunch_command.is_empty() {
                        data.relaunch_command = data.path.to_string_lossy().to_string();
                    }
                }
                _ => {}
            }

            if item.id().is_empty() {
                item.set_id(uuid::Uuid::new_v4().to_string());
            }

            if !dict.contains(item.id()) {
                dict.insert(item.id().clone());
                result.push(item);
            }
        }
        result
    }

    pub fn sanitize(&mut self) {
        let mut dict = HashSet::new();
        self.left = Self::sanitize_items(&mut dict, std::mem::take(&mut self.left));
        self.center = Self::sanitize_items(&mut dict, std::mem::take(&mut self.center));
        self.right = Self::sanitize_items(&mut dict, std::mem::take(&mut self.right));
    }
}
