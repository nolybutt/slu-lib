import { SeelenCommand, SeelenEvent } from '../../handlers/mod.ts';

import type {
  FancyToolbarSettings,
  FancyToolbarSide,
  HideMode,
  SeelenLauncherMonitor,
  SeelenLauncherSettings,
  SeelenWallSettings,
  SeelenWegMode,
  SeelenWegSettings,
  SeelenWegSide,
  Settings as ISettings,
  ThirdPartyWidgetSettings,
  UpdateChannel,
  VirtualDesktopStrategy,
  WidgetId,
  WindowManagerSettings,
} from '@seelen-ui/types';
import { createInstanceInvoker, createInstanceOnEvent } from '../../utils/State.ts';
import { enumFromUnion } from '../../utils/enums.ts';
import { invoke } from '../../handlers/mod.ts';
import {
  SeelenLauncherWidgetId,
  SeelenToolbarWidgetId,
  SeelenWallWidgetId,
  SeelenWegWidgetId,
  SeelenWindowManagerWidgetId,
  Widget,
} from '../widget.ts';
import { getCurrentWidgetInfo } from '../mod.ts';

export class Settings {
  constructor(public inner: ISettings) {}
  static readonly default = createInstanceInvoker(this, SeelenCommand.StateGetDefaultSettings);
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.StateGetSettings);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.StateSettingsChanged);

  static async loadCustom(path: string): Promise<Settings> {
    return new this(await invoke(SeelenCommand.StateGetSettings, { path }));
  }

  /**
   * Returns the settings for the current widget, taking in care of the replicas
   * the returned object will be a merge of:
   * - the default settings set on the widget definition
   * - the stored user settings
   * - the instance patch settings (if apply)
   * - the monitor patch settings (if apply)
   */
  async getCurrentWidgetConfig(): Promise<ThirdPartyWidgetSettings> {
    const currentWidget = await Widget.getCurrentAsync();

    const { monitorId, instanceId, id } = getCurrentWidgetInfo();

    const root = this.inner.byWidget[id];
    const instance = instanceId ? root?.$instances?.[instanceId] : undefined;
    const monitor = monitorId ? this.inner.monitorsV2[monitorId]?.byWidget[id] : undefined;

    return {
      ...currentWidget.getDefaultConfig(),
      ...(root || {}),
      ...(instance || {}),
      ...(monitor || {}),
    };
  }

  private getBundledWidgetConfig<T extends ThirdPartyWidgetSettings>(id: WidgetId): T {
    const config = this.inner.byWidget[id];
    if (!config) throw new Error('Bundled widget settings not found');
    return config as T;
  }

  get fancyToolbar(): FancyToolbarSettings {
    return this.getBundledWidgetConfig(SeelenToolbarWidgetId);
  }

  get seelenweg(): SeelenWegSettings {
    return this.getBundledWidgetConfig(SeelenWegWidgetId);
  }

  get windowManager(): WindowManagerSettings {
    return this.getBundledWidgetConfig(SeelenWindowManagerWidgetId);
  }

  get launcher(): SeelenLauncherSettings {
    return this.getBundledWidgetConfig(SeelenLauncherWidgetId);
  }

  get wall(): SeelenWallSettings {
    return this.getBundledWidgetConfig(SeelenWallWidgetId);
  }

  /** Will store the settings on disk */
  save(): Promise<void> {
    return invoke(SeelenCommand.StateWriteSettings, { settings: this.inner });
  }
}

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

const FancyToolbarSide = enumFromUnion<FancyToolbarSide>({
  Top: 'Top',
  Bottom: 'Bottom',
});

const VirtualDesktopStrategy = enumFromUnion<VirtualDesktopStrategy>({
  Native: 'Native',
  Seelen: 'Seelen',
});

const SeelenWegMode = enumFromUnion<SeelenWegMode>({
  FullWidth: 'FullWidth',
  MinContent: 'MinContent',
});

const HideMode = enumFromUnion<HideMode>({
  Never: 'Never',
  Always: 'Always',
  OnOverlap: 'OnOverlap',
});

const SeelenWegSide = enumFromUnion<SeelenWegSide>({
  Left: 'Left',
  Right: 'Right',
  Top: 'Top',
  Bottom: 'Bottom',
});

const SeelenLauncherMonitor = enumFromUnion<SeelenLauncherMonitor>({
  Primary: 'Primary',
  MouseOver: 'MouseOver',
});

const UpdateChannel = enumFromUnion<UpdateChannel>({
  Release: 'Release',
  Beta: 'Beta',
  Nightly: 'Nightly',
});

export {
  FancyToolbarSide,
  HideMode,
  SeelenLauncherMonitor,
  SeelenWegMode,
  SeelenWegSide,
  UpdateChannel,
  VirtualDesktopStrategy,
};

export * from './settings_by_monitor.ts';
export * from './declaration.ts';
