import { assertExists } from '@std/assert';
import { TauriCommand, WebviewEvent } from './State.ts';
import { SeelenCommand, SeelenEvent } from '../lib.ts';

Deno.test('should exist getAsync in Test class', () => {
  // @ts-expect-error: Class should declare `getAsync` method
  @TauriCommand(SeelenCommand.StateGetSettings)
  class _T0 {}

  @TauriCommand(SeelenCommand.StateGetSettings)
  class T0 {
    static readonly getAsync: TauriCommand<T0>;
  }

  assertExists(T0.getAsync);
});

Deno.test('should exist onChange in Test class', () => {
  // @ts-expect-error: Class should declare `onChange` method
  @WebviewEvent(SeelenEvent.StateSettingsChanged)
  class _T1 {}

  @WebviewEvent(SeelenEvent.StateSettingsChanged)
  class T1 {
    static readonly onChange: WebviewEvent<T1>;
  }

  assertExists(T1.onChange);
});
