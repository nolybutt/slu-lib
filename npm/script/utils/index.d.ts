export * from './hooks.js';
export * from './layered_hitbox.js';
export declare function getRootElement(): HTMLElement | null;
export declare class Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export declare function disableWebviewShortcutsAndContextMenu(): void;
interface WidgetInformation {
    id: string;
    label: string;
    attachedMonitor: string | null;
}
export declare function getCurrentWidget(): WidgetInformation;
//# sourceMappingURL=index.d.ts.map