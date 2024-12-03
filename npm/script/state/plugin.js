"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginList = exports.Plugin = void 0;
const event_1 = require("@tauri-apps/api/event");
const index_js_1 = require("../handlers/index.js");
const index_js_2 = require("../utils/index.js");
class Plugin {
    id = '';
    icon = '';
    target = '';
    plugin = {};
    bundled = false;
}
exports.Plugin = Plugin;
class PluginList {
    inner;
    constructor(inner) {
        this.inner = inner;
    }
    static async getAsync() {
        return new PluginList(await (0, index_js_1.invoke)(index_js_1.SeelenCommand.StateGetPlugins));
    }
    static onChange(cb) {
        return (0, event_1.listen)(index_js_1.SeelenEvent.StatePluginsChanged, (event) => {
            cb(new PluginList(event.payload));
        });
    }
    all() {
        return this.inner;
    }
    forCurrentWidget() {
        const target = (0, index_js_2.getCurrentWidget)().id;
        return this.inner.filter((plugin) => plugin.target === target);
    }
}
exports.PluginList = PluginList;
