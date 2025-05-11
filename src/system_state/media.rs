use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
pub struct MediaPlayerOwner {
    pub name: String,
}

#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
pub struct MediaPlayer {
    pub umid: String,
    pub title: String,
    pub author: String,
    pub thumbnail: Option<PathBuf>,
    pub owner: MediaPlayerOwner,
    pub playing: bool,
    pub default: bool,
}

#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
pub struct MediaDeviceSession {
    pub id: String,
    pub instance_id: String,
    pub process_id: u32,
    pub name: String,
    pub icon_path: Option<PathBuf>,
    pub is_system: bool,
    pub volume: f32,
    pub muted: bool,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, Serialize, TS)]
#[serde(rename_all = "camelCase")]
pub enum MediaDeviceType {
    Input,
    Output,
}

#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
pub struct MediaDevice {
    pub id: String,
    pub name: String,
    pub r#type: MediaDeviceType,
    pub is_default_multimedia: bool,
    pub is_default_communications: bool,
    pub sessions: Vec<MediaDeviceSession>,
    pub volume: f32,
    pub muted: bool,
}
