export var AppExtraFlag;
(function (AppExtraFlag) {
    AppExtraFlag["Float"] = "float";
    AppExtraFlag["Force"] = "force";
    AppExtraFlag["Unmanage"] = "unmanage";
    AppExtraFlag["Pinned"] = "pinned";
    AppExtraFlag["Hidden"] = "hidden";
})(AppExtraFlag || (AppExtraFlag = {}));
export var AppIdentifierType;
(function (AppIdentifierType) {
    AppIdentifierType["Exe"] = "Exe";
    AppIdentifierType["Class"] = "Class";
    AppIdentifierType["Title"] = "Title";
    AppIdentifierType["Path"] = "Path";
})(AppIdentifierType || (AppIdentifierType = {}));
export var MatchingStrategy;
(function (MatchingStrategy) {
    MatchingStrategy["Equals"] = "Equals";
    MatchingStrategy["StartsWith"] = "StartsWith";
    MatchingStrategy["EndsWith"] = "EndsWith";
    MatchingStrategy["Contains"] = "Contains";
    MatchingStrategy["Regex"] = "Regex";
})(MatchingStrategy || (MatchingStrategy = {}));
export class AppIdentifier {
    static placeholder() {
        return {
            id: 'new-app.exe',
            kind: AppIdentifierType.Exe,
            matchingStrategy: MatchingStrategy.Equals,
            negation: false,
            and: [],
            or: [],
        };
    }
}
export class AppConfiguration {
    static placeholder() {
        return {
            name: 'New App',
            category: null,
            boundWorkspace: null,
            boundMonitor: null,
            identifier: AppIdentifier.placeholder(),
            isBundled: false,
            options: [],
        };
    }
}
