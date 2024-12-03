export * from './invokers.ts';
export * from './events.ts';

import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import { SeelenEvent } from './events.ts';
import { SeelenCommand } from './invokers.ts';

export function Obtainable<T>(invokeKey: SeelenCommand, eventKey: SeelenEvent) {
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
