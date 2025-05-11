use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
pub struct FocusedApp {
    hwnd: isize,
    title: String,
    name: String,
    exe: Option<PathBuf>,
    umid: Option<String>,
    is_maximized: bool,
    is_seelen_overlay: bool,
}
