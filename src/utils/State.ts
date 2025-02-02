import type { UnlistenFn } from '@tauri-apps/api/event';
import { invoke, type SeelenCommand, type SeelenEvent, subscribe } from '../handlers/mod.ts';
import type { Options as ListenerOptions } from '@tauri-apps/api/event';

// deno-lint-ignore no-explicit-any
interface ConstructorWithSingleArg<T = any> {
  // deno-lint-ignore no-explicit-any
  new (inner: T): any;
}

export function createInstanceInvoker<
  This extends ConstructorWithSingleArg<ReturnByCommand[Command]>,
  Command extends SeelenCommand,
>(
  Class: This,
  command: Command,
  args?: NonNullable<ArgsByCommand[Command]>,
): () => Promise<InstanceType<This>> {
  return async () => {
    return new Class(await invoke(command, args));
  };
}

type InstanceOnEvent<Instance> = (cb: (instance: Instance) => void) => Promise<UnlistenFn>;

export function createInstanceOnEvent<This extends ConstructorWithSingleArg>(
  Class: This,
  event: SeelenEvent,
  options?: ListenerOptions,
): InstanceOnEvent<InstanceType<This>> {
  return (cb: (instance: InstanceType<This>) => void) => {
    return subscribe(
      event,
      (eventData) => {
        cb(new Class(eventData.payload));
      },
      options,
    );
  };
}
