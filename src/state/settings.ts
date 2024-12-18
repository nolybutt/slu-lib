import { SeelenCommand, SeelenEvent } from '../handlers/mod.ts';
import { invoke } from '../lib.ts';
import { TauriCommand, WebviewEvent } from '../utils/State.ts';

import type {
  HideMode,
  SeelenLauncherMonitor,
  SeelenWegMode,
  SeelenWegSide,
  Settings as ISettings,
  UpdateChannel,
  VirtualDesktopStrategy,
} from '@seelen-ui/types';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.StateGetSettings]: null;
    [SeelenCommand.StateGetDefaultSettings]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.StateGetSettings]: ISettings;
    [SeelenCommand.StateGetDefaultSettings]: ISettings;
  }
  interface PayloadByEvent {
    [SeelenEvent.StateSettingsChanged]: ISettings;
  }
}

@TauriCommand(SeelenCommand.StateGetSettings)
@WebviewEvent(SeelenEvent.StateSettingsChanged)
export class Settings {
  constructor(public inner: ISettings) {}

  static readonly getAsync: TauriCommand<Settings>;
  static readonly onChange: WebviewEvent<Settings>;

  static async default(): Promise<Settings> {
    return new this(await invoke(SeelenCommand.StateGetDefaultSettings));
  }
}

// =================================================================================
//    From here some enums as helpers like @seelen-ui/types only contains types
// =================================================================================

export const VirtualDesktopStrategyEnum = {
  Native: 'Native',
  Seelen: 'Seelen',
} satisfies Record<VirtualDesktopStrategy, VirtualDesktopStrategy>;

export const SeelenWegModeEnum = {
  FullWidth: 'FullWidth',
  MinContent: 'MinContent',
} satisfies Record<SeelenWegMode, SeelenWegMode>;

export const HideModeEnum = {
  Never: 'Never',
  Always: 'Always',
  OnOverlap: 'OnOverlap',
} satisfies Record<HideMode, HideMode>;

export const SeelenWegSideEnum = {
  Left: 'Left',
  Right: 'Right',
  Top: 'Top',
  Bottom: 'Bottom',
} satisfies Record<SeelenWegSide, SeelenWegSide>;

export const SeelenLauncherMonitorEnum = {
  Primary: 'Primary',
  MouseOver: 'MouseOver',
} satisfies Record<SeelenLauncherMonitor, SeelenLauncherMonitor>;

export const UpdateChannelEnum = {
  Release: 'Release',
  Beta: 'Beta',
  Nightly: 'Nightly',
} satisfies Record<UpdateChannel, UpdateChannel>;
