use schemars::JsonSchema;

#[macro_export(local_inner_macros)]
macro_rules! __switch {
    {
        if { $($if:tt)+ }
        do { $($do:tt)* }
        else { $($else:tt)* }
    } => { $($do)* };
    {
        if { }
        do { $($do:tt)* }
        else { $($else:tt)* }
    } => { $($else)* };
}

/// This struct is intented to work with ts-rs flattening
#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(untagged)]
pub enum Flatenable<T> {
    Inner(T),
}

impl<T: Default> Default for Flatenable<T> {
    fn default() -> Self {
        Flatenable::Inner(T::default())
    }
}

impl<T> std::ops::Deref for Flatenable<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        match self {
            Flatenable::Inner(inner) => inner,
        }
    }
}

impl<T> std::ops::DerefMut for Flatenable<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        match self {
            Flatenable::Inner(inner) => inner,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema, TS)]
#[ts(type = "unknown")]
pub struct TsUnknown(pub serde_json::Value);

impl From<serde_json::Value> for TsUnknown {
    fn from(value: serde_json::Value) -> Self {
        TsUnknown(value)
    }
}
