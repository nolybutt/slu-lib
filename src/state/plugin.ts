import { SeelenCommand, SeelenEvent } from '../handlers/mod.ts';
import { getCurrentWidget } from '../utils/mod.ts';
import { List } from '../utils/List.ts';
import { createInstanceInvoker, createInstanceOnEvent } from '../utils/State.ts';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetPlugins]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetPlugins]: Plugin[];
  }
  interface PayloadByEvent {
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
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetPlugins);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.StatePluginsChanged);

  forCurrentWidget(): Plugin[] {
    const target = getCurrentWidget().id;
    return this.inner.filter((plugin) => plugin.target === target);
  }
}
