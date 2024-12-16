import { invoke as tauriInvoke, type InvokeArgs, type InvokeOptions } from "@tauri-apps/api/core";
import {
  listen,
  type UnlistenFn,
  type Options as ListenerOptions,
  type EventCallback,
} from "@tauri-apps/api/event";

import type { SeelenCommand } from "./commands.ts";
import type { SeelenEvent } from "../lib.ts";

export * from "./commands.ts";

declare global {
  interface ArgsBySeelenCommand extends Record<SeelenCommand, InvokeArgs | null> {
    [SeelenCommand.IsDevMode]: null;
    [SeelenCommand.CheckForUpdates]: null;
    [SeelenCommand.InstallLastAvailableUpdate]: null;
  }

  interface ReturnBySeelenCommand extends Record<SeelenCommand, unknown> {
    [SeelenCommand.IsDevMode]: boolean;
    [SeelenCommand.CheckForUpdates]: boolean;
    [SeelenCommand.InstallLastAvailableUpdate]: never; // this will close the app
  }

  interface PayloadBySeelenEvent extends Record<SeelenEvent, unknown> {}
}

/** Will call to the background process */
export function invoke<T extends SeelenCommand>(
  command: T,
  args?: NonNullable<ArgsBySeelenCommand[T]>,
  options?: InvokeOptions
): Promise<ReturnBySeelenCommand[T]> {
  return tauriInvoke(command, args, options);
}

export function subscribe<T extends SeelenEvent>(
  event: T,
  cb: EventCallback<PayloadBySeelenEvent[T]>,
  options?: ListenerOptions
): Promise<UnlistenFn> {
  return listen(event, cb, options);
}
