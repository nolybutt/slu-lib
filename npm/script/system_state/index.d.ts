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
export declare class UIColors {
    static default(): UIColors;
    static getAsync(): Promise<UIColors>;
    static onChange(cb: (value: UIColors) => void): Promise<() => void>;
    static setAssCssVariables(colors: UIColors): void;
}
//# sourceMappingURL=index.d.ts.map