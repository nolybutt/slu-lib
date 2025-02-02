import type { UnlistenFn } from '@tauri-apps/api/event';
import { invoke, type SeelenCommand, type SeelenEvent, subscribe } from '../handlers/mod.ts';
import type { Options as ListenerOptions } from '@tauri-apps/api/event';

// deno-lint-ignore no-explicit-any
interface ConstructorWithSingleArg<T = any> {
  // deno-lint-ignore no-explicit-any
  new (arg0: T): any;
}

export function createInstanceInvoker<
  Command extends SeelenCommand,
  This extends ConstructorWithSingleArg<ReturnByCommand[Command]>,
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

export function createInstanceOnEvent<
  Event extends SeelenEvent,
  This extends ConstructorWithSingleArg<PayloadByEvent[Event]>,
>(Class: This, event: Event, options?: ListenerOptions): InstanceOnEvent<InstanceType<This>> {
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
