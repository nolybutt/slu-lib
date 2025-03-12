// All this structs/interfaces are taken from https://learn.microsoft.com/en-us/uwp/schemas/tiles/toastschema/schema-root

use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
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
    binding: Binding,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, TS)]
#[serde(default)]

pub struct Binding {
    #[serde(rename = "@template")]
    template: ToastTemplateType,
    #[serde(rename = "$value")]
    entries: Vec<ToastBindingEntry>,
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
    id: Option<u32>,
    #[serde(rename = "$value")]
    content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]

pub struct ToastImage {
    #[serde(rename = "@id")]
    id: Option<u32>,
    #[serde(rename = "@src")]
    src: String,
    #[serde(rename = "@alt")]
    alt: Option<String>,
    #[serde(default, rename = "@addImageQuery")]
    add_image_query: bool,
    #[serde(rename = "@placement")]
    placement: Option<ToastImagePlacement>,
    #[serde(rename = "@hint-crop")]
    hint_crop: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub enum ToastImagePlacement {
    #[serde(alias = "appLogoOverride")]
    AppLogoOverride,
    #[serde(alias = "hero")]
    Hero,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct ToastGroup {
    subgroup: Vec<ToastSubGroup>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, TS)]
#[serde(default)]
pub struct ToastSubGroup {
    entries: Vec<ToastSubGroupEntry>,
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
    entries: Vec<ToastActionsEntry>,
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
    id: Option<String>,
    #[serde(rename = "@type")]
    r#type: String,
    #[serde(rename = "@placeHolderContent")]
    placeholder: Option<String>,
    #[serde(rename = "@title")]
    title: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]

pub struct ToastAction {
    #[serde(rename = "@content")]
    content: String,
    #[serde(rename = "@arguments")]
    arguments: String,
    #[serde(default, rename = "@activationType")]
    activation_type: ToastActionActivationType,
    #[serde(default, rename = "@afterActivationBehavior")]
    after_activation_behavior: ToastActionAfterActivationBehavior,
    /// if set to "contextMenu" then the action will be added to_string the context menu intead of the toast
    #[serde(rename = "@placement")]
    placement: Option<ToastActionPlacement>,
    /// this is used as button icon
    #[serde(rename = "@imageUri")]
    image_uri: Option<String>,
    #[serde(rename = "@hint-inputid")]
    hint_inputid: Option<String>,
    #[serde(rename = "@hint-buttonStyle")]
    hint_button_style: Option<ToastActionButtonStyle>,
    /// button tooltip
    #[serde(rename = "@hint-toolTip")]
    hint_tooltip: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub enum ToastActionButtonStyle {
    Sucess,
    Critical,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, TS)]
pub enum ToastActionAfterActivationBehavior {
    #[default]
    #[serde(alias = "default")]
    Default,
    #[serde(alias = "pendingUpdate")]
    PendingUpdate,
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
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub enum ToastActionPlacement {
    #[serde(alias = "contextMenu")]
    ContextMenu,
}
