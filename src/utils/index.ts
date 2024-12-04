import { getCurrentWindow } from '@tauri-apps/api/window';

export * from './hooks.ts';
export * from './layered_hitbox.ts';

export function getRootElement(): HTMLElement | null {
  const element = document.getElementById('root');
  if (!element) {
    throw new Error('Root element not found');
  }
  return element;
}

export class Rect {
  left = 0;
  top = 0;
  right = 0;
  bottom = 0;
}

export function disableWebviewShortcutsAndContextMenu() {
  globalThis.addEventListener('keydown', function (event) {
    // prevent refresh
    if (event.key === 'F5') {
      event.preventDefault();
    }

    // prevent close
    if (event.altKey && event.key === 'F4') {
      event.preventDefault();
    }

    // others
    if (event.ctrlKey) {
      switch (event.key) {
        case 'r': // reload
        case 'f': // search
        case 'g': // find
        case 'p': // print
        case 'j': // downloads
        case 'u': // source
          event.preventDefault();
          break;
      }
    }
  });
  globalThis.addEventListener('contextmenu', (e) => e.preventDefault(), {
    capture: true,
  });
  globalThis.addEventListener('drop', (e) => e.preventDefault());
  globalThis.addEventListener('dragover', (e) => e.preventDefault());
}

interface WidgetInformation {
  id: string;
  label: string;
  attachedMonitor: string | null;
}

// label schema: user/resource__query__monitor:display5
export function getCurrentWidget(): WidgetInformation {
  const { label } = getCurrentWindow();
  const parsedLabel = label.replace('__query__', '?').replace(':', '=');
  const query = new URLSearchParams(parsedLabel);
  return {
    id: `@${parsedLabel.split('?')[0]}`,
    label,
    attachedMonitor: query.get('monitor'),
  };
}
