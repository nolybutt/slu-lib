export * from './invokers.js';
export * from './events.js';
import type { SeelenEvent } from './events.js';
import type { SeelenCommand } from './invokers.js';
interface _Obtainable<T> {
    new (): object;
    getAsync(): Promise<T>;
    onChange(cb: (value: T) => void): Promise<() => void>;
}
export declare function Obtainable<T>(invokeKey: SeelenCommand, eventKey: SeelenEvent): _Obtainable<T>;
//# sourceMappingURL=index.d.ts.map