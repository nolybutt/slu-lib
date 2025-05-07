use std::collections::HashMap;

use schemars::JsonSchema;

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, TS)]
#[serde(untagged)]
pub enum FlatenableMap<K, V>
where
    K: Eq + std::hash::Hash,
{
    Map(HashMap<K, V>),
}

impl<K: Eq + std::hash::Hash, V> Default for FlatenableMap<K, V> {
    fn default() -> Self {
        Self::Map(HashMap::new())
    }
}
