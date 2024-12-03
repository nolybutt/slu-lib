export interface UIColors {
    background: string;
    foreground: string;
    accent_darkest: string;
    accent_darker: string;
    accent_dark: string;
    accent: string;
    accent_light: string;
    accent_lighter: string;
    accent_lightest: string;
    complement: string | null;
}
declare const UIColors_base: {
    new (): {};
    getAsync(): Promise<UIColors>;
    onChange(cb: (value: UIColors) => void): Promise<() => void>;
};
export declare class UIColors extends UIColors_base {
    static default(): UIColors;
    static setAssCssVariables(colors: UIColors): void;
}
export {};
//# sourceMappingURL=index.d.ts.map