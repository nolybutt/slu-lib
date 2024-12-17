import type { UnlistenFn } from '@tauri-apps/api/event';
import { invoke, type SeelenCommand, type SeelenEvent, subscribe } from '../lib.ts';

interface ClassFromCommand<Instance> {
  // deno-lint-ignore no-explicit-any
  new (inner: any): Instance;
  getAsync: TauriCommand<Instance>;
}

interface ClassFromEvent<Instance> {
  // deno-lint-ignore no-explicit-any
  new (inner: any): Instance;
  onChange: WebviewEvent<Instance>;
}

export type TauriCommand<Instance> = () => Promise<Instance>;

export type WebviewEvent<Instance> = (cb: (instance: Instance) => void) => Promise<UnlistenFn>;

export function TauriCommand<Class extends ClassFromCommand<InstanceType<Class>>>(
  command: SeelenCommand,
): (Class: Class, metadata: ClassDecoratorContext<Class>) => void {
  return (_Class, metadata) => {
    metadata.addInitializer(function (this): void {
      this.getAsync = async function getAsync(): Promise<InstanceType<Class>> {
        return new this(await invoke(command));
      };
    });
  };
}

export function WebviewEvent<Class extends ClassFromEvent<InstanceType<Class>>>(
  event: SeelenEvent,
): (Class: Class, metadata: ClassDecoratorContext<Class>) => void {
  return (_Class, metadata) => {
    metadata.addInitializer(function (this): void {
      this.onChange = function onChange(
        cb: (instance: InstanceType<Class>) => void,
      ): Promise<UnlistenFn> {
        return subscribe(event, (eventData) => {
          cb(new this(eventData.payload as unknown[]));
        });
      };
    });
  };
}
