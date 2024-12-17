import { SeelenCommand, SeelenEvent } from '../handlers/mod.ts';
import { getCurrentWidget } from '../utils/mod.ts';
import { List } from '../utils/List.ts';
import { TauriCommand, WebviewEvent } from '../utils/State.ts';

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

@TauriCommand(SeelenCommand.StateGetPlugins)
@WebviewEvent(SeelenEvent.StatePluginsChanged)
export class PluginList extends List<Plugin> {
  static readonly getAsync: TauriCommand<PluginList>;
  static readonly onChange: WebviewEvent<PluginList>;

  forCurrentWidget(): Plugin[] {
    const target = getCurrentWidget().id;
    return this.inner.filter((plugin) => plugin.target === target);
  }
}
