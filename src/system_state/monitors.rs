use crate::rect::Rect;

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct PhysicalMonitor {
    pub id: String,
    pub name: String,
    pub rect: Rect,
    pub dpi: f64,
}

#[derive(Debug, Serialize, Deserialize, TS)]
pub struct Brightness {
    min: u32,
    max: u32,
    current: u32,
}
