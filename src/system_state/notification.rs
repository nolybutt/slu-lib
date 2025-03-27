// All this structs/interfaces are taken from https://learn.microsoft.com/en-us/uwp/schemas/tiles/toastschema/schema-root

use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct AppNotification {
    pub id: u32,
    pub app_umid: String,
    pub app_name: String,
    pub app_description: String,
    pub date: i64,
    pub content: Toast,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct Toast {
    #[serde(rename = "@launch")]
    pub launch: Option<String>,
    pub header: Option<ToastHeader>,
    pub visual: ToastVisual,
    pub actions: Option<ToastActions>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastHeader {
    #[serde(rename = "@id")]
    pub id: String,
    #[serde(rename = "@title")]
    pub title: String,
    #[serde(rename = "@arguments")]
    pub arguments: String,
    #[serde(default, rename = "@activationType")]
    pub activation_type: ToastActionActivationType,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastVisual {
    pub binding: Binding,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, TS)]
#[serde(default)]

pub struct Binding {
    #[serde(rename = "@template")]
    pub template: ToastTemplateType,
    #[serde(default, rename = "$value")]
    pub entries: Vec<ToastBindingEntry>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, TS)]
pub enum ToastTemplateType {
    ToastImageAndText01,
    ToastImageAndText02,
    ToastImageAndText03,
    ToastImageAndText04,
    ToastText01,
    ToastText02,
    ToastText03,
    ToastText04,
    #[default]
    ToastGeneric,
    Unknown(String),
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
pub enum ToastBindingEntry {
    Text(ToastText),
    Image(ToastImage),
    Group(ToastGroup),
    Progress(ToastProgress),
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastText {
    #[serde(rename = "@id")]
    pub id: Option<u32>,
    #[serde(default, rename = "$value")]
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastImage {
    #[serde(rename = "@id")]
    pub id: Option<u32>,
    #[serde(rename = "@src")]
    pub src: String,
    #[serde(rename = "@alt")]
    pub alt: Option<String>,
    #[serde(default, rename = "@addImageQuery")]
    pub add_image_query: bool,
    #[serde(rename = "@placement")]
    pub placement: Option<ToastImagePlacement>,
    #[serde(rename = "@hint-crop")]
    pub hint_crop: Option<ToastImageCropType>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub enum ToastImageCropType {
    #[serde(alias = "circle")]
    Circle,
    Unknown(String),
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub enum ToastImagePlacement {
    #[serde(alias = "appLogoOverride")]
    AppLogoOverride,
    #[serde(alias = "hero")]
    Hero,
    Unknown(String),
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastGroup {
    pub subgroup: Vec<ToastSubGroup>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, TS)]
#[serde(default)]
pub struct ToastSubGroup {
    pub entries: Vec<ToastSubGroupEntry>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
pub enum ToastSubGroupEntry {
    Text(ToastText),
    Image(ToastImage),
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastProgress {
    #[serde(rename = "@title")]
    pub title: Option<String>,
    #[serde(rename = "@status")]
    pub status: String,
    #[serde(rename = "@value")]
    pub value: String,
    #[serde(rename = "@valueStringOverride")]
    pub value_string_override: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastActions {
    #[serde(default, rename = "$value")]
    pub entries: Vec<ToastActionsEntry>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
pub enum ToastActionsEntry {
    Input(ToastInput),
    Action(ToastAction),
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastInput {
    #[serde(rename = "@id")]
    pub id: String,
    #[serde(rename = "@type")]
    pub r#type: ToastInputType,
    #[serde(rename = "@placeHolderContent")]
    pub placeholder: Option<String>,
    #[serde(rename = "@title")]
    pub title: Option<String>,
    #[serde(default)]
    pub selection: Vec<ToastInputSelection>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub enum ToastInputType {
    #[serde(alias = "text")]
    Text,
    #[serde(alias = "selection")]
    Selection,
    Unknown(String),
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastInputSelection {
    #[serde(rename = "@id")]
    pub id: String,
    #[serde(rename = "@content")]
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastAction {
    #[serde(rename = "@content")]
    pub content: String,
    #[serde(rename = "@arguments")]
    pub arguments: String,
    #[serde(default, rename = "@activationType")]
    pub activation_type: ToastActionActivationType,
    #[serde(default, rename = "@afterActivationBehavior")]
    pub after_activation_behavior: ToastActionAfterActivationBehavior,
    /// if set to "contextMenu" then the action will be added to_string the context menu intead of the toast
    #[serde(rename = "@placement")]
    pub placement: Option<ToastActionPlacement>,
    /// this is used as button icon
    #[serde(rename = "@imageUri")]
    pub image_uri: Option<String>,
    #[serde(rename = "@hint-inputid")]
    pub hint_inputid: Option<String>,
    #[serde(rename = "@hint-buttonStyle")]
    pub hint_button_style: Option<ToastActionButtonStyle>,
    /// button tooltip
    #[serde(rename = "@hint-toolTip")]
    pub hint_tooltip: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub enum ToastActionButtonStyle {
    #[serde(alias = "success")]
    Sucess,
    #[serde(alias = "critical")]
    Critical,
    Unknown(String),
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, TS)]
pub enum ToastActionAfterActivationBehavior {
    #[default]
    #[serde(alias = "default")]
    Default,
    #[serde(alias = "pendingUpdate")]
    PendingUpdate,
    Unknown(String),
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, TS)]
pub enum ToastActionActivationType {
    #[default]
    #[serde(alias = "foreground")]
    Foreground,
    #[serde(alias = "background")]
    Background,
    #[serde(alias = "protocol")]
    Protocol,
    #[serde(alias = "system")]
    System,
    Unknown(String),
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub enum ToastActionPlacement {
    #[serde(alias = "contextMenu")]
    ContextMenu,
    Unknown(String),
}
