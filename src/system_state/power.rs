#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[allow(non_snake_case)]
pub struct PowerStatus {
    pub ac_line_status: u8,
    pub battery_flag: u8,
    pub battery_life_percent: u8,
    pub system_status_flag: u8,
    pub battery_life_time: u32,
    pub battery_full_life_time: u32,
}

// https://learn.microsoft.com/en-us/windows/win32/api/powersetting/ne-powersetting-effective_power_mode
#[derive(Debug, Clone, Serialize, TS)]
#[repr(i32)]
pub enum PowerMode {
    BatterySaver,
    BetterBattery,
    Balanced,
    HighPerformance,
    MaxPerformance,
    GameMode,
    MixedReality,
    Unknown = i32::MAX,
}

#[derive(Debug, Clone, Serialize, TS)]
#[serde(rename_all = "camelCase")]
pub struct Battery {
    // static info
    vendor: Option<String>,
    model: Option<String>,
    serial_number: Option<String>,
    technology: String,
    // common information
    state: String,
    capacity: f32,
    temperature: Option<f32>,
    percentage: f32,
    cycle_count: Option<u32>,
    smart_charging: bool, // this is triggered by windows idk how but this is a simulation of that
    // energy stats
    energy: f32,
    energy_full: f32,
    energy_full_design: f32,
    energy_rate: f32,
    voltage: f32,
    // charge stats
    time_to_full: Option<f32>,
    time_to_empty: Option<f32>,
}
