import { invoke, SeelenCommand, SeelenEvent, subscribe } from '../lib.ts';
import { List } from '../utils/List.ts';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.SystemGetLanguages]: null;
  }
  interface ReturnByCommand {
    [SeelenCommand.SystemGetLanguages]: Language[];
  }
  interface PayloadByEvent {
    [SeelenEvent.SystemLanguagesChanged]: Language[];
  }
}

export interface KeyboardLayout {
  id: string;
  displayName: string;
}

export interface Language {
  code: string;
  name: string;
  inputMethods: KeyboardLayout[];
}

export class LanguageList extends List<Language> {
  static override async getAsync(): Promise<LanguageList> {
    return new LanguageList(await invoke(SeelenCommand.SystemGetLanguages));
  }

  static onChange(cb: (value: LanguageList) => void): Promise<() => void> {
    return subscribe(SeelenEvent.SystemLanguagesChanged, (event) => {
      cb(new LanguageList(event.payload));
    });
  }
}
