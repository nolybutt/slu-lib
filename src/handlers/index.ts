export * from './invokers.ts';
export * from './events.ts';

import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import type { SeelenEvent } from './events.ts';
import type { SeelenCommand } from './invokers.ts';

interface _Obtainable<T> {
  new (): object;
  getAsync(): Promise<T>;
  onChange(cb: (value: T) => void): Promise<() => void>;
}

export function Obtainable<T>(invokeKey: SeelenCommand, eventKey: SeelenEvent): _Obtainable<T> {
  return class {
    static async getAsync(): Promise<T> {
      return await invoke(invokeKey);
    }

    static async onChange(cb: (value: T) => void): Promise<() => void> {
      return await listen<T>(eventKey, (event) => {
        cb(event.payload);
      });
    }
  };
}
