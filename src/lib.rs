pub mod error;
pub mod handlers;
pub mod rect;
pub mod state;
pub mod system_state;

pub use error::SeelenLibError;

#[test]
fn generate_schemas() {
    use state::{AppConfig, IconPack, Placeholder, Settings, Theme, WegItem, WindowManagerLayout};

    fn write_schema<T>(path: &str)
    where
        T: schemars::JsonSchema,
    {
        let schema = schemars::schema_for!(T);
        std::fs::write(path, serde_json::to_string_pretty(&schema).unwrap()).unwrap();
    }

    std::fs::create_dir_all("./schemas").unwrap();
    write_schema::<Settings>("./schemas/settings.schema.json");
    write_schema::<Placeholder>("./schemas/placeholder.schema.json");
    write_schema::<Theme>("./schemas/theme.schema.json");
    write_schema::<WindowManagerLayout>("./schemas/layout.schema.json");
    write_schema::<Vec<AppConfig>>("./schemas/settings_by_app.schema.json");
    write_schema::<Vec<WegItem>>("./schemas/weg_items.schema.json");
    write_schema::<IconPack>("./schemas/icon_pack.schema.json");

    handlers::SeelenEvent::generate_ts_file("./src/handlers/events.ts");
}
