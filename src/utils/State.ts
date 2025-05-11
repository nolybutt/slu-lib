import type { UnlistenFn } from '@tauri-apps/api/event';
import type {
  AllSeelenCommandArguments,
  AllSeelenCommandReturns,
  AllSeelenEventPayloads,
  SeelenCommand,
  SeelenEvent,
} from '../handlers/mod.ts';
import { listen as tauriListen, type Options as ListenerOptions } from '@tauri-apps/api/event';
import { invoke as tauriInvoke } from '@tauri-apps/api/core';

// deno-lint-ignore no-explicit-any
interface ConstructorWithSingleArg<T = any> {
  // deno-lint-ignore no-explicit-any
  new (arg0: T): any;
}

export function createInstanceInvoker<
  Command extends SeelenCommand,
  This extends ConstructorWithSingleArg<AllSeelenCommandReturns[Command]>,
>(
  Class: This,
  command: Command,
  args?: NonNullable<AllSeelenCommandArguments[Command]>,
): () => Promise<InstanceType<This>> {
  return async () => {
    return new Class(await tauriInvoke(command, args));
  };
}

type InstanceOnEvent<Instance> = (cb: (instance: Instance) => void) => Promise<UnlistenFn>;

export function createInstanceOnEvent<
  Event extends SeelenEvent,
  This extends ConstructorWithSingleArg<AllSeelenEventPayloads[Event]>,
>(Class: This, event: Event, options?: ListenerOptions): InstanceOnEvent<InstanceType<This>> {
  return (cb: (instance: InstanceType<This>) => void) => {
    return tauriListen(
      event,
      (eventData) => {
        cb(new Class(eventData.payload as AllSeelenEventPayloads[Event]));
      },
      options,
    );
  };
}
