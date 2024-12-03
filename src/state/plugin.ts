import { listen, UnlistenFn } from '@tauri-apps/api/event';

import { invoke, SeelenCommand, SeelenEvent } from '../handlers/index.ts';
import { getCurrentWidget } from '../utils/index.ts';

export class Plugin {
  id: string = '';
  icon: string = '';
  target: string = '';
  plugin: any = {};
  bundled: boolean = false;
}

export class PluginList {
  private constructor(private inner: Plugin[]) {}

  static async getAsync(): Promise<PluginList> {
    return new PluginList(await invoke(SeelenCommand.StateGetPlugins));
  }

  static onChange(cb: (value: PluginList) => void): Promise<UnlistenFn> {
    return listen<Plugin[]>(SeelenEvent.StatePluginsChanged, (event) => {
      cb(new PluginList(event.payload));
    });
  }

  all(): Plugin[] {
    return this.inner;
  }

  forCurrentWidget(): Plugin[] {
    const target = getCurrentWidget().id;
    return this.inner.filter((plugin) => plugin.target === target);
  }
}
