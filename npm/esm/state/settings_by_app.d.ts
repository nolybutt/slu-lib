export declare enum AppExtraFlag {
    Float = "float",
    Force = "force",
    Unmanage = "unmanage",
    Pinned = "pinned",
    Hidden = "hidden"
}
export declare enum AppIdentifierType {
    Exe = "Exe",
    Class = "Class",
    Title = "Title",
    Path = "Path"
}
export declare enum MatchingStrategy {
    Equals = "Equals",
    StartsWith = "StartsWith",
    EndsWith = "EndsWith",
    Contains = "Contains",
    Regex = "Regex"
}
export interface AppIdentifier {
    id: string;
    kind: AppIdentifierType;
    matchingStrategy: MatchingStrategy;
    negation: boolean;
    and: AppIdentifier[];
    or: AppIdentifier[];
}
export declare class AppIdentifier {
    static placeholder(): AppIdentifier;
}
export interface AppConfiguration {
    name: string;
    category: string | null;
    boundMonitor: number | null;
    boundWorkspace: number | null;
    identifier: AppIdentifier;
    options: Array<AppExtraFlag>;
    isBundled: boolean;
}
export declare class AppConfiguration {
    static placeholder(): AppConfiguration;
}
//# sourceMappingURL=settings_by_app.d.ts.map