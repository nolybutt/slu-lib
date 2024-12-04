import { Obtainable, SeelenCommand, SeelenEvent } from '../handlers/index.js';

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

const _UIColors = Obtainable<UIColors>(SeelenCommand.GetSystemColors, SeelenEvent.ColorsChanged);
export class UIColors {
  static default(): UIColors {
    return {
      background: '#ffffff',
      foreground: '#000000',
      accent_darkest: '#990000',
      accent_darker: '#aa0000',
      accent_dark: '#bb0000',
      accent: '#cc0000',
      accent_light: '#dd0000',
      accent_lighter: '#ee0000',
      accent_lightest: '#ff0000',
      complement: null,
    };
  }

  static async getAsync(): Promise<UIColors> {
    return await _UIColors.getAsync();
  }

  static async onChange(cb: (value: UIColors) => void): Promise<() => void> {
    return await _UIColors.onChange(cb);
  }

  static setAssCssVariables(colors: UIColors) {
    for (const [key, value] of Object.entries(colors)) {
      if (typeof value !== 'string') {
        continue;
      }
      const hex = value.replace('#', '').slice(0, 6);
      const color = parseInt(hex, 16);
      const r = (color >> 16) & 255;
      const g = (color >> 8) & 255;
      const b = color & 255;
      // replace rust snake case with kebab case
      const name = key.replace('_', '-');
      document.documentElement.style.setProperty(`--config-${name}-color`, value.slice(0, 7));
      document.documentElement.style.setProperty(`--config-${name}-color-rgb`, `${r}, ${g}, ${b}`);
    }
  }
}
