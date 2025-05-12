use schemars::JsonSchema;
use url::Url;

use crate::resource::ResourceText;

#[derive(Debug, Clone, Default, Serialize, Deserialize, JsonSchema, TS)]
pub struct ThemeSettingsDefinition(Vec<ThemeVariableDefinition>);

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(tag = "syntax")]
pub enum ThemeVariableDefinition {
    /// This config definition will allow to users write any string.\
    /// Css syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/string \
    /// ### example:
    /// ```css
    /// --var-name: "user input"
    /// ```
    String(ThemeVariable<String>),
    /// This config definition will allow to users select a color and
    /// will be stored as a hex value, opacity is always allowed via UI.\
    /// Css syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value \
    /// ### example:
    /// ```css
    /// --var-name: #ff22ee
    /// --var-name: #ff22ee
    /// ```
    #[serde(rename = "<color>")]
    Color(ThemeVariable<String>),
    /// This will allow to the user set any lenght in any unit. (px, %, vw, etc).
    /// If you need force a specific unit, use Number instead lenght and on theme code makes the conversion.\
    /// Css syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/length \
    /// ### example:
    /// ```css
    /// --var-name: 10px
    /// --var-name: 10%
    /// --var-name: 10vw
    /// ```
    #[serde(rename = "<length>")]
    Length(ThemeVariableWithUnit<f64>),
    /// This will allow to users to set any number, without units.
    /// Css syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/number \
    /// ### example:
    /// ```css
    /// --var-name: 10
    /// ```
    #[serde(rename = "<number>")]
    Number(ThemeVariable<f64>),
    /// This will allow to users to set any url.\
    /// Css syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/url_value \
    /// ### example:
    /// ```css
    /// --var-name: url("https://example.com/image.png")
    /// ```
    #[serde(rename = "<url>")]
    Url(ThemeVariable<Url>),
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
pub struct ThemeVariable<T> {
    /// Label to show to the user on Settings.
    pub label: ResourceText,
    /// Css variable name, example: `--my-css-variable`
    pub name: String,
    /// initial variable value, if not manually set by the user.
    pub initial_value: T,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "camelCase")]
pub struct ThemeVariableWithUnit<T> {
    /// Label to show to the user on Settings.
    pub label: ResourceText,
    /// Css variable name, example: `--my-css-variable`
    pub name: String,
    /// initial variable value, if not manually set by the user.
    pub initial_value: T,
    /// Css unit, example: `px`
    pub initial_value_unit: String,
}
