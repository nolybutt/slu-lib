use serde::{Deserialize, Serialize};

use super::ResourceId;

#[derive(Debug, Clone, Hash, PartialEq, Eq, Serialize, Deserialize)]
pub struct WidgetId(pub ResourceId);

impl From<ResourceId> for WidgetId {
    fn from(value: ResourceId) -> Self {
        Self(value)
    }
}

impl std::fmt::Display for WidgetId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Widget {
    pub id: WidgetId,
    pub js: Option<String>,
    pub css: Option<String>,
    pub html: Option<String>,
}
