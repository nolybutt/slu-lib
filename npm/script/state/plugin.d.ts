import { type UnlistenFn } from '@tauri-apps/api/event';
export declare class Plugin {
    id: string;
    icon: string;
    target: string;
    plugin: object;
    bundled: boolean;
}
export declare class PluginList {
    private inner;
    private constructor();
    static getAsync(): Promise<PluginList>;
    static onChange(cb: (value: PluginList) => void): Promise<UnlistenFn>;
    all(): Plugin[];
    forCurrentWidget(): Plugin[];
}
//# sourceMappingURL=plugin.d.ts.map