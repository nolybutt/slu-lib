use schemars::JsonSchema;

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
