import type { IconPack, ResourceMetadata } from '@seelen-ui/types';
import { IconPackList } from './icon_pack.ts';
import { IconPackManager } from './icon_pack.ts';
import { assert } from '@std/assert/assert';

const GOT_BY_PATH = 'GOT_BY_PATH';
const GOT_BY_FILENAME = 'GOT_BY_FILENAME';
const GOT_BY_EXTENSION = 'GOT_BY_EXTENSION';
const GOT_BY_UMID = 'GOT_BY_UMID';

const mockedIconPackA: IconPack = {
  id: 'mockedIconPackA',
  metadata: {
    filename: 'a',
  } as ResourceMetadata,
  apps: {
    MSEdge: GOT_BY_UMID,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\msedge.exe': GOT_BY_PATH,
    'C:\\Windows\\explorer.exe': GOT_BY_PATH,
    'C:\\Program Files (x86)\\Some\\App\\filenameApp.exe': GOT_BY_PATH,
  },
  files: {
    png: GOT_BY_EXTENSION,
    jpg: GOT_BY_EXTENSION,
    txt: GOT_BY_EXTENSION,
  },
};

const mockedIconPackB: IconPack = {
  id: 'mockedIconPackB',
  metadata: {
    filename: 'b',
  } as ResourceMetadata,
  apps: {
    'C:\\Windows\\explorer.exe': GOT_BY_PATH,
    'filenameApp.exe': GOT_BY_FILENAME,
  },
  files: {
    txt: GOT_BY_EXTENSION,
  },
};

const mockedIconPackC: IconPack = {
  id: 'mockedIconPackC',
  metadata: {
    filename: 'c',
  } as ResourceMetadata,
  apps: {
    'C:\\folder\\app1.exe': GOT_BY_PATH,
  },
  files: {},
};

class IconPackManagerMock extends IconPackManager {
  public constructor() {
    super('', new IconPackList([mockedIconPackB, mockedIconPackA, mockedIconPackC]), ['a', 'b']);
  }

  public setActives(actives: string[]): void {
    this._actives = actives;
  }
}

Deno.test('IconPackManager > getIconPath', async (t) => {
  const manager = new IconPackManagerMock();

  await t.step({
    name: 'should return null if no icon pack matches the umid or path',
    fn: () => {
      assert(manager.getIconPath({ path: 'C:\\nonexistent\\path.exe' }) === null);
      assert(manager.getIconPath({ umid: 'NonexistentUMID' }) === null);
    },
  });

  await t.step({
    name: 'should ignore no used icon packs',
    fn: () => {
      assert(manager.getIconPath({ path: 'C:\\folder\\app1.exe' }) === null);
    },
  });

  await t.step({
    name: 'should follow cascade order set by active icon packs',
    fn: () => {
      assert(
        manager.getIconPath({
          path: 'C:\\Windows\\explorer.exe',
        }) === `\\b\\${GOT_BY_PATH}`,
      );
      const old = manager.actives;
      manager.setActives(['b', 'a']);
      assert(
        manager.getIconPath({
          path: 'C:\\Windows\\explorer.exe',
        }) === `\\a\\${GOT_BY_PATH}`,
      );
      manager.setActives(old);
    },
  });

  await t.step({
    name: 'should priorize umid over path',
    fn: () => {
      assert(
        manager.getIconPath({
          path: 'C:\\Program Files (x86)\\Microsoft\\Edge\\msedge.exe',
          umid: 'MSEdge',
        }) === `\\a\\${GOT_BY_UMID}`,
      );
    },
  });

  // we priotizite the path over the filename but the icon pack order is most important than this
  // so in this test the icon should be get from B that have filename key, over A that have a full path key
  await t.step({
    name: 'should get by filename over path when active pack has priority',
    fn: () => {
      assert(
        manager.getIconPath({
          path: 'C:\\Program Files (x86)\\Some\\App\\filenameApp.exe',
        }) === `\\b\\${GOT_BY_FILENAME}`,
      );
    },
  });

  await t.step({
    name: 'should get by extension',
    fn: () => {
      assert(
        manager.getIconPath({
          path: 'C:\\Program Files (x86)\\Some\\App\\someFile.txt',
        }) === `\\b\\${GOT_BY_EXTENSION}`,
      );
      assert(
        manager.getIconPath({
          path: 'C:\\Program Files (x86)\\Some\\App\\someFile.png',
        }) === `\\a\\${GOT_BY_EXTENSION}`,
      );
    },
  });
});
