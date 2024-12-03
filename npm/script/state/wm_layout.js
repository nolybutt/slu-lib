"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoFallbackBehavior = exports.NodeSubtype = exports.NodeType = void 0;
var NodeType;
(function (NodeType) {
    NodeType["Vertical"] = "Vertical";
    NodeType["Horizontal"] = "Horizontal";
    NodeType["Leaf"] = "Leaf";
    NodeType["Stack"] = "Stack";
    NodeType["Fallback"] = "Fallback";
})(NodeType || (exports.NodeType = NodeType = {}));
var NodeSubtype;
(function (NodeSubtype) {
    NodeSubtype["Temporal"] = "Temporal";
    NodeSubtype["Permanent"] = "Permanent";
})(NodeSubtype || (exports.NodeSubtype = NodeSubtype = {}));
var NoFallbackBehavior;
(function (NoFallbackBehavior) {
    NoFallbackBehavior["Float"] = "Float";
    NoFallbackBehavior["Unmanaged"] = "Unmanaged";
})(NoFallbackBehavior || (exports.NoFallbackBehavior = NoFallbackBehavior = {}));
