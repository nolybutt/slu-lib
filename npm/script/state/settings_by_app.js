"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfiguration = exports.AppIdentifier = exports.MatchingStrategy = exports.AppIdentifierType = exports.AppExtraFlag = void 0;
var AppExtraFlag;
(function (AppExtraFlag) {
    AppExtraFlag["Float"] = "float";
    AppExtraFlag["Force"] = "force";
    AppExtraFlag["Unmanage"] = "unmanage";
    AppExtraFlag["Pinned"] = "pinned";
    AppExtraFlag["Hidden"] = "hidden";
})(AppExtraFlag || (exports.AppExtraFlag = AppExtraFlag = {}));
var AppIdentifierType;
(function (AppIdentifierType) {
    AppIdentifierType["Exe"] = "Exe";
    AppIdentifierType["Class"] = "Class";
    AppIdentifierType["Title"] = "Title";
    AppIdentifierType["Path"] = "Path";
})(AppIdentifierType || (exports.AppIdentifierType = AppIdentifierType = {}));
var MatchingStrategy;
(function (MatchingStrategy) {
    MatchingStrategy["Equals"] = "Equals";
    MatchingStrategy["StartsWith"] = "StartsWith";
    MatchingStrategy["EndsWith"] = "EndsWith";
    MatchingStrategy["Contains"] = "Contains";
    MatchingStrategy["Regex"] = "Regex";
})(MatchingStrategy || (exports.MatchingStrategy = MatchingStrategy = {}));
class AppIdentifier {
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
exports.AppIdentifier = AppIdentifier;
class AppConfiguration {
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
exports.AppConfiguration = AppConfiguration;
