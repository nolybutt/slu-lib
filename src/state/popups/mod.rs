use std::collections::HashMap;

type StyleValue = String;
type Styles = HashMap<String, StyleValue>;

#[derive(Debug, Default, Clone, Serialize, Deserialize, TS)]
#[serde(default, rename_all = "camelCase")]
#[ts(export)]
pub struct SluPopupConfig {
    pub title: Vec<SluPopupContent>,
    pub content: Vec<SluPopupContent>,
    pub footer: Vec<SluPopupContent>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[serde(
    tag = "type",
    rename_all = "camelCase",
    rename_all_fields = "camelCase"
)]
pub enum SluPopupContent {
    Text {
        value: String,
        styles: Styles,
    },
    Image {
        href: String,
        styles: Styles,
    },
    Button {
        /// event name to be emitted on click ex: "test::clicked"
        on_click: String,
        styles: Styles,
    },
    Group {
        items: Vec<SluPopupContent>,
        styles: Styles,
    },
}
