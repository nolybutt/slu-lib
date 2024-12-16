import { listen, type UnlistenFn } from "@tauri-apps/api/event";

import { invoke, SeelenCommand, SeelenEvent } from "../handlers/index.ts";
import { getCurrentWidget } from "../utils/index.ts";
import { List } from "../utils/List.ts";

declare global {
  interface ArgsBySeelenCommand {
    [SeelenCommand.StateGetPlugins]: null;
  }
  interface ReturnBySeelenCommand {
    [SeelenCommand.StateGetPlugins]: Plugin[];
  }
  interface PayloadBySeelenEvent {
    [SeelenEvent.StatePluginsChanged]: Plugin[];
  }
}

export interface Plugin {
  id: string;
  icon: string;
  target: string;
  plugin: object;
  bundled: boolean;
}

export class PluginList extends List<Plugin> {
  static override async getAsync(): Promise<PluginList> {
    return new PluginList(await invoke(SeelenCommand.StateGetPlugins));
  }

  static onChange(cb: (value: PluginList) => void): Promise<UnlistenFn> {
    return listen<Plugin[]>(SeelenEvent.StatePluginsChanged, (event) => {
      cb(new PluginList(event.payload));
    });
  }

  forCurrentWidget(): Plugin[] {
    const target = getCurrentWidget().id;
    return this.inner.filter((plugin) => plugin.target === target);
  }
}
