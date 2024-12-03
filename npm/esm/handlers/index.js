export * from './invokers.js';
export * from './events.js';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
export function Obtainable(invokeKey, eventKey) {
    return class {
        static async getAsync() {
            return await invoke(invokeKey);
        }
        static async onChange(cb) {
            return await listen(eventKey, (event) => {
                cb(event.payload);
            });
        }
    };
}
