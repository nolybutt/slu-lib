use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
pub struct FocusedApp {
    pub hwnd: isize,
    pub title: String,
    pub name: String,
    pub exe: Option<PathBuf>,
    pub umid: Option<String>,
    pub is_maximized: bool,
    pub is_seelen_overlay: bool,
}
