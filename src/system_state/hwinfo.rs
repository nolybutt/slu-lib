#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct CpuCoreInfo {
    pub id: u32,
    /// CPU usage percentage [0.0..100.0]
    pub usage: f32,
    /// Current frequency in MHz if known
    pub frequency: Option<u32>,
    /// Current temperature in Celsius if available
    pub temperature: Option<f32>,
}

#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct TemperatureSensor {
    pub name: String,
    pub temperature: f32,
}

#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct HwInfo {
    pub cpus: Vec<CpuCoreInfo>,
    pub other_temperatures: Vec<TemperatureSensor>,
}
