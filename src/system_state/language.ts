import { SeelenCommand, SeelenEvent } from '../handlers/mod.ts';
import { List } from '../utils/List.ts';
import { createInstanceInvoker, createInstanceOnEvent } from '../utils/State.ts';

export interface KeyboardLayout {
  id: string;
  handle: string;
  displayName: string;
  active: boolean;
}

export interface SystemLanguage {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  inputMethods: KeyboardLayout[];
}

export class LanguageList extends List<SystemLanguage> {
  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.SystemGetLanguages);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.SystemLanguagesChanged);
}
