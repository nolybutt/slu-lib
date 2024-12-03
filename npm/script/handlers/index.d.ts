export * from './invokers.js';
export * from './events.js';
import { SeelenEvent } from './events.js';
import { SeelenCommand } from './invokers.js';
export declare function Obtainable<T>(invokeKey: SeelenCommand, eventKey: SeelenEvent): {
    new (): {};
    getAsync(): Promise<T>;
    onChange(cb: (value: T) => void): Promise<() => void>;
};
//# sourceMappingURL=index.d.ts.map