use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Widget {
    pub id: String,
    pub js: Option<String>,
    pub css: Option<String>,
    pub html: Option<String>,
}
