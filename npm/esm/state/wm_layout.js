export var NodeType;
(function (NodeType) {
    NodeType["Vertical"] = "Vertical";
    NodeType["Horizontal"] = "Horizontal";
    NodeType["Leaf"] = "Leaf";
    NodeType["Stack"] = "Stack";
    NodeType["Fallback"] = "Fallback";
})(NodeType || (NodeType = {}));
export var NodeSubtype;
(function (NodeSubtype) {
    NodeSubtype["Temporal"] = "Temporal";
    NodeSubtype["Permanent"] = "Permanent";
})(NodeSubtype || (NodeSubtype = {}));
export var NoFallbackBehavior;
(function (NoFallbackBehavior) {
    NoFallbackBehavior["Float"] = "Float";
    NoFallbackBehavior["Unmanaged"] = "Unmanaged";
})(NoFallbackBehavior || (NoFallbackBehavior = {}));
