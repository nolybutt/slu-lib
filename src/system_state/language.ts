import { invoke, SeelenCommand, SeelenEvent, subscribe } from "../lib.ts";
import { List } from "../utils/List.ts";

declare global {
  interface ArgsBySeelenCommand {
    [SeelenCommand.SystemGetLanguages]: null;
  }
  interface ReturnBySeelenCommand {
    [SeelenCommand.SystemGetLanguages]: Language[];
  }
  interface PayloadBySeelenEvent {
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
