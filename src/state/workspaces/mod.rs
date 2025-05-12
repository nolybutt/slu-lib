#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct DesktopWorkspace {
    pub id: WorkspaceId,
    pub name: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
pub struct WorkspaceId(pub String);

impl std::ops::Deref for WorkspaceId {
    type Target = String;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl std::ops::DerefMut for WorkspaceId {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<String> for WorkspaceId {
    fn from(value: String) -> Self {
        Self(value)
    }
}
