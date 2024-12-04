"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declareDocumentAsLayeredHitbox = declareDocumentAsLayeredHitbox;
const webviewWindow_1 = require("@tauri-apps/api/webviewWindow");
const index_js_1 = require("../handlers/index.js");
async function declareDocumentAsLayeredHitbox() {
    const webview = (0, webviewWindow_1.getCurrentWebviewWindow)();
    const { x, y } = await webview.outerPosition();
    const { width, height } = await webview.outerSize();
    const webviewRect = { x, y, width, height };
    let ignoring_cursor_events = true;
    let is_layered_enabled = true;
    await webview.setIgnoreCursorEvents(true);
    webview.onMoved((e) => {
        webviewRect.x = e.payload.x;
        webviewRect.y = e.payload.y;
    });
    webview.onResized((e) => {
        webviewRect.width = e.payload.width;
        webviewRect.height = e.payload.height;
    });
    webview.listen(index_js_1.SeelenEvent.HandleLayeredHitboxes, (event) => {
        is_layered_enabled = event.payload;
    });
    webview.listen(index_js_1.SeelenEvent.GlobalMouseMove, (event) => {
        if (!is_layered_enabled) {
            return;
        }
        const [mouseX, mouseY] = event.payload;
        const { x: windowX, y: windowY, width: windowWidth, height: windowHeight, } = webviewRect;
        // check if the mouse is inside the window
        const isHoverWindow = mouseX >= windowX &&
            mouseX <= windowX + windowWidth &&
            mouseY >= windowY &&
            mouseY <= windowY + windowHeight;
        if (!isHoverWindow) {
            return;
        }
        const adjustedX = (mouseX - windowX) / globalThis.devicePixelRatio;
        const adjustedY = (mouseY - windowY) / globalThis.devicePixelRatio;
        const isOverBody = document.elementFromPoint(adjustedX, adjustedY) == document.body;
        if (isOverBody && !ignoring_cursor_events) {
            ignoring_cursor_events = true;
            webview.setIgnoreCursorEvents(true);
        }
        if (!isOverBody && ignoring_cursor_events) {
            ignoring_cursor_events = false;
            webview.setIgnoreCursorEvents(false);
        }
    });
    globalThis.addEventListener('touchstart', (e) => {
        const isOverBody = e.target == document.body;
        if (isOverBody && !ignoring_cursor_events) {
            ignoring_cursor_events = true;
            webview.setIgnoreCursorEvents(true);
        }
    });
}
