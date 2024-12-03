use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Plugin {
    pub id: String,
    #[serde(default = "Plugin::default_icon")]
    pub icon: String,
    pub target: String,
    pub plugin: serde_yaml::Value,
    #[serde(default)]
    pub bundled: bool,
}

impl Plugin {
    pub fn default_icon() -> String {
        "PiPuzzlePieceDuotone".to_string()
    }
}