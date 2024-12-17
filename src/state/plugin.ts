import { invoke, SeelenCommand, SeelenEvent } from '../handlers/mod.ts';
import { getCurrentWidget } from '../utils/mod.ts';
import { List } from '../utils/List.ts';
import { subscribe } from '../lib.ts';

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

  static onChange(cb: (value: PluginList) => void): Promise<() => void> {
    return subscribe(SeelenEvent.StatePluginsChanged, (event) => {
      cb(new PluginList(event.payload));
    });
  }

  forCurrentWidget(): Plugin[] {
    const target = getCurrentWidget().id;
    return this.inner.filter((plugin) => plugin.target === target);
  }
}
