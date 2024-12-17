import { SeelenCommand, SeelenEvent } from '../lib.ts';
import { List } from '../utils/List.ts';
import { TauriCommand, WebviewEvent } from '../utils/State.ts';

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

@TauriCommand(SeelenCommand.SystemGetLanguages)
@WebviewEvent(SeelenEvent.SystemLanguagesChanged)
export class LanguageList extends List<Language> {
  static readonly getAsync: TauriCommand<LanguageList>;
  static readonly onChange: WebviewEvent<LanguageList>;
}
