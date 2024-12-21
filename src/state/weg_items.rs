use std::{collections::HashSet, path::PathBuf};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
pub struct WegAppGroupItem {
    pub title: String,
    pub handle: isize,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
pub struct PinnedWegItemData {
    /// Direct path to file, forder or program.
    ///
    /// PWA: In case of pwa programs this will be the creator of the process, will point to the
    /// browser executable so this is not unique across PWA apps, and can't be used to identify apps.
    /// Also this can't be used to launch the app.
    ///
    /// UWP: In case of UWP apps this will be the path to the app executable, but this can't be used to
    /// invoke the app instead should be used the `shell:AppsFolder` + app user model id.
    #[serde(alias = "exe")]
    pub path: PathBuf,
    /// Program, file or folder to execute/open when clicking the item.
    ///
    /// Exclusion: On `.lnk` files this is the target of the link and when open action is triggered,
    /// this field and arguments are ignored, using the link file as command.
    ///
    /// Important: This should be unique across all weg items because this is used as identifier, dupes will be removed on load.
    ///
    /// Note: this field is mandatory and will be filled with `path` if it is not set
    #[serde(default, alias = "execution_path")]
    pub execution_command: String,
    /// true if self.path is a folder
    #[serde(default)]
    pub is_dir: bool,
    /// Window handles in the app group, in case of pinned file/dir always will be empty
    #[serde(default, skip_deserializing)]
    pub windows: Vec<WegAppGroupItem>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(tag = "type")]
pub enum WegItem {
    #[serde(alias = "PinnedApp")]
    Pinned(PinnedWegItemData),
    Temporal(PinnedWegItemData),
    Separator {
        id: String,
    },
    Media,
    StartMenu,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(default)]
#[ts(export)]
pub struct WegItems {
    pub left: Vec<WegItem>,
    pub center: Vec<WegItem>,
    pub right: Vec<WegItem>,
}

impl Default for WegItems {
    fn default() -> Self {
        Self {
            left: vec![WegItem::StartMenu],
            center: vec![WegItem::Pinned(PinnedWegItemData {
                path: "C:\\Windows\\explorer.exe".into(),
                execution_command: "C:\\Windows\\explorer.exe".into(),
                is_dir: false,
                windows: vec![],
            })],
            right: vec![WegItem::Media],
        }
    }
}

impl WegItems {
    fn sanitize_items(dict: &mut HashSet<String>, items: Vec<WegItem>) -> Vec<WegItem> {
        let mut result = Vec::new();
        for mut item in items {
            match &mut item {
                WegItem::Pinned(data) => {
                    if !data.path.exists() {
                        continue;
                    }
                    if data.execution_command.is_empty() {
                        data.execution_command = data.path.to_string_lossy().to_string();
                    }
                    if !dict.contains(&data.execution_command) {
                        dict.insert(data.execution_command.clone());
                        result.push(item);
                    }
                }
                WegItem::Temporal(data) => {
                    if data.windows.len() == 0 || !data.path.exists() {
                        continue;
                    }
                    if data.execution_command.is_empty() {
                        data.execution_command = data.path.to_string_lossy().to_string();
                    }
                    if !dict.contains(&data.execution_command) {
                        dict.insert(data.execution_command.clone());
                        result.push(item);
                    }
                }
                WegItem::Separator { id } => {
                    if !dict.contains(id) {
                        dict.insert(id.clone());
                        result.push(item);
                    }
                }
                WegItem::StartMenu => {
                    if !dict.contains("StartMenu") {
                        dict.insert("StartMenu".to_owned());
                        result.push(item);
                    }
                }
                WegItem::Media => {
                    if !dict.contains("Media") {
                        dict.insert("Media".to_owned());
                        result.push(item);
                    }
                }
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
