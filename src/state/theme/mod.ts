import type { ResourceId, Settings as ISettings, Theme as ITheme, ThemeId } from '@seelen-ui/types';
import { SeelenCommand, SeelenEvent, type UnSubscriber } from '../../handlers/mod.ts';
import { List } from '../../utils/List.ts';
import { newFromInvoke, newOnEvent } from '../../utils/State.ts';
import { Widget } from '../widget/mod.ts';
import { Settings } from '../settings/mod.ts';
import { UIColors } from '../../system_state/ui_colors.ts';

export class ThemeList extends List<ITheme> {
  static getAsync(): Promise<ThemeList> {
    return newFromInvoke(this, SeelenCommand.StateGetThemes);
  }

  static onChange(cb: (user: ThemeList) => void): Promise<UnSubscriber> {
    return newOnEvent(cb, this, SeelenEvent.StateThemesChanged);
  }

  applyToDocument(activeIds: ThemeId[], variables: ISettings['byTheme']): void {
    const activeThemes = this.asArray()
      .filter((theme) => activeIds.includes(theme.id))
      .sort((a, b) => activeIds.indexOf(a.id) - activeIds.indexOf(b.id));

    for (const theme of activeThemes) {
      new Theme(theme).applyToDocument(variables[theme.id]);
    }
  }
}

export interface Theme extends ITheme {}

export class Theme {
  constructor(plain: ITheme) {
    Object.assign(this, plain);
  }

  /** Will add the styles targeting the current widget id */
  applyToDocument(varValues: ISettings['byTheme'][ResourceId] = {}): void {
    const widgetId = Widget.getCurrentWidgetId();
    let styles = ``;

    for (const def of this.settings) {
      if (!isValidCssVariableName(def.name)) {
        continue;
      }
      styles += `
        @property ${def.name} {
          syntax: "${def.syntax}";
          inherits: true;
          initial-value: ${def.initialValue}${'initialValueUnit' in def ? def.initialValueUnit : ''}
        }
      `;
    }

    const layerName = 'theme-' + this.metadata.path.toLowerCase().replaceAll(/[^a-zA-Z0-9]/g, '_');
    styles += `@layer ${layerName}-shared {\n${this.sharedStyles}\n}\n`;

    const variablesContent = Object.entries(varValues)
      .filter(([name]) => isValidCssVariableName(name))
      .map(([name, value]) => `${name}: ${value || ''};`)
      .join('\n');
    styles += `@layer ${layerName} {\n:root {${variablesContent}}\n${this.styles[widgetId] ?? ''}\n}\n`;

    const elementId = `Theme::${this.id}`;
    document.getElementById(elementId)?.remove();

    const styleElement = document.createElement('style');
    styleElement.id = elementId;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }
}

function isValidCssVariableName(name: string): boolean {
  return /^--[\w\d-]*$/.test(name);
}

/**
 * This will apply the active themes for this widget, and automatically update
 * when the themes or settings change. Also will add the systehm ui colors to the document.
 */
export async function startThemingTool(): Promise<void> {
  let settings = await Settings.getAsync();
  let themes = await ThemeList.getAsync();

  await ThemeList.onChange((newThemes) => {
    themes = newThemes;
    themes.applyToDocument(settings.activeThemes, settings.byTheme);
  });

  await Settings.onChange((newSettings) => {
    settings = newSettings;
    themes.applyToDocument(settings.activeThemes, settings.byTheme);
  });

  (await UIColors.getAsync()).setAsCssVariables();
  await UIColors.onChange((colors) => colors.setAsCssVariables());

  themes.applyToDocument(settings.activeThemes, settings.byTheme);
}
