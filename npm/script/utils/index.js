"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
exports.getRootElement = getRootElement;
exports.disableWebviewShortcutsAndContextMenu = disableWebviewShortcutsAndContextMenu;
exports.getCurrentWidget = getCurrentWidget;
const window_1 = require("@tauri-apps/api/window");
__exportStar(require("./hooks.js"), exports);
__exportStar(require("./layered_hitbox.js"), exports);
function getRootElement() {
    const element = document.getElementById('root');
    if (!element) {
        throw new Error('Root element not found');
    }
    return element;
}
class Rect {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;
}
exports.Rect = Rect;
function disableWebviewShortcutsAndContextMenu() {
    globalThis.addEventListener('keydown', function (event) {
        // prevent refresh
        if (event.key === 'F5') {
            event.preventDefault();
        }
        // prevent close
        if (event.altKey && event.key === 'F4') {
            event.preventDefault();
        }
        // others
        if (event.ctrlKey) {
            switch (event.key) {
                case 'r': // reload
                case 'f': // search
                case 'g': // find
                case 'p': // print
                case 'j': // downloads
                case 'u': // source
                    event.preventDefault();
                    break;
            }
        }
    });
    globalThis.addEventListener('contextmenu', (e) => e.preventDefault(), { capture: true });
    globalThis.addEventListener('drop', (e) => e.preventDefault());
    globalThis.addEventListener('dragover', (e) => e.preventDefault());
}
// label schema: user/resource__query__monitor:display5
function getCurrentWidget() {
    const { label } = (0, window_1.getCurrentWindow)();
    const parsedLabel = label.replace('__query__', '?').replace(':', '=');
    const query = new URLSearchParams(parsedLabel);
    return {
        id: `@${parsedLabel.split('?')[0]}`,
        label,
        attachedMonitor: query.get('monitor'),
    };
}
