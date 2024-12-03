import { listen } from '@tauri-apps/api/event';
import { invoke, SeelenCommand, SeelenEvent } from '../handlers/index.js';
import { getCurrentWidget } from '../utils/index.js';
export class Plugin {
    id = '';
    icon = '';
    target = '';
    plugin = {};
    bundled = false;
}
export class PluginList {
    inner;
    constructor(inner) {
        this.inner = inner;
    }
    static async getAsync() {
        return new PluginList(await invoke(SeelenCommand.StateGetPlugins));
    }
    static onChange(cb) {
        return listen(SeelenEvent.StatePluginsChanged, (event) => {
            cb(new PluginList(event.payload));
        });
    }
    all() {
        return this.inner;
    }
    forCurrentWidget() {
        const target = getCurrentWidget().id;
        return this.inner.filter((plugin) => plugin.target === target);
    }
}
