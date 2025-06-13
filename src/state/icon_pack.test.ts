import type { IconPack, ResourceMetadata } from '@seelen-ui/types';
import { IconPackList } from './icon_pack.ts';
import { IconPackManager } from './icon_pack.ts';
import { assertEquals } from '@std/assert';

// Custom assertion for null values
function assertNull(value: unknown): void {
  return assertEquals(value, null);
}

// Constants for test icons
const GOT_BY_PATH = 'GOT_BY_PATH';
const GOT_BY_FILENAME = 'GOT_BY_FILENAME';
const GOT_BY_EXTENSION = 'GOT_BY_EXTENSION';
const GOT_BY_UMID = 'GOT_BY_UMID';

// Deep clone helper to ensure test isolation
const cloneIconPack = (pack: IconPack): IconPack => JSON.parse(JSON.stringify(pack));

// Factory function for mock icon packs
const createMockIconPacks = () => ({
  packA: {
    id: 'mockedIconPackA',
    metadata: { filename: 'a' } as ResourceMetadata,
    missing: 'MissingIconA.png',
    appEntries: [
      { umid: 'MSEdge', path: 'C:\\Program Files (x86)\\Microsoft\\Edge\\msedge.exe', icon: GOT_BY_UMID },
      { umid: null, path: 'C:\\Windows\\explorer.exe', icon: GOT_BY_PATH },
      { umid: null, path: 'C:\\Program Files (x86)\\Some\\App\\filenameApp.exe', icon: GOT_BY_PATH },
    ],
    fileEntries: [
      { extension: 'txt', icon: GOT_BY_EXTENSION },
      { extension: 'png', icon: GOT_BY_EXTENSION },
      { extension: 'jpg', icon: GOT_BY_EXTENSION },
    ],
    customEntries: [
      { key: 'my-custom-icon', icon: 'CustomA.png' },
    ],
  },
  packB: {
    id: 'mockedIconPackB',
    metadata: { filename: 'b' } as ResourceMetadata,
    missing: 'MissingIconB.png',
    appEntries: [
      { umid: null, path: 'C:\\Windows\\explorer.exe', icon: GOT_BY_PATH },
      { umid: null, path: 'filenameApp.exe', icon: GOT_BY_FILENAME },
    ],
    fileEntries: [
      { extension: 'txt', icon: GOT_BY_EXTENSION },
    ],
    customEntries: [
      { key: 'my-custom-icon', icon: 'CustomB.png' },
    ],
  },
  packC: {
    id: 'mockedIconPackC',
    metadata: { filename: 'c' } as ResourceMetadata,
    missing: null,
    appEntries: [
      { umid: null, path: 'C:\\folder\\app1.exe', icon: GOT_BY_PATH },
    ],
    fileEntries: [],
    customEntries: [],
  },
});

// Test context manager for cleaner test setup
class IconPackManagerTestContext {
  private manager: IconPackManagerMock;

  // Default active packs: ['b', 'a'] (note 'a' has higher priority as it's last)
  constructor(initialActives: string[] = ['b', 'a']) {
    const mocks = createMockIconPacks();
    this.manager = new IconPackManagerMock(
      [cloneIconPack(mocks.packA), cloneIconPack(mocks.packB), cloneIconPack(mocks.packC)],
      initialActives,
    );
  }

  get instance(): IconPackManagerMock {
    return this.manager;
  }

  // Fluent interface for changing active packs
  withActives(actives: string[]): this {
    this.manager.setActives(actives);
    return this;
  }
}

// Mock implementation of IconPackManager for testing
class IconPackManagerMock extends IconPackManager {
  constructor(packs: IconPack[], activeKeys: string[]) {
    super('', new IconPackList(packs), activeKeys);
    this.resolveAvailableIcons();
    this.cacheActiveIconPacks();
  }

  public setActives(actives: string[]): void {
    this._activeKeys = actives;
    this.cacheActiveIconPacks();
  }
}

Deno.test('IconPackManager', async (t) => {
  await t.step('Icon lookup functionality', async (t) => {
    await t.step('should return null for non-existent paths or UMIDs', () => {
      const ctx = new IconPackManagerTestContext();
      // Non-existent path
      assertNull(ctx.instance.getIconPath({ path: 'C:\\nonexistent\\path.exe' }));
      // Non-existent UMID
      assertNull(ctx.instance.getIconPath({ umid: 'NonexistentUMID' }));
    });

    await t.step('should ignore inactive icon packs', () => {
      // Only 'a' and 'b' are active by default
      const ctx = new IconPackManagerTestContext();
      // This path only exists in packC which is inactive
      assertNull(ctx.instance.getIconPath({ path: 'C:\\folder\\app1.exe' }));
    });

    await t.step('should respect cascading priority order (last has highest priority)', () => {
      // Default order is ['b', 'a'] so 'a' has higher priority
      const ctx = new IconPackManagerTestContext(['b', 'a']);

      // 'a' should take priority for explorer.exe (last in active list)
      assertEquals(
        ctx.instance.getIconPath({ path: 'C:\\Windows\\explorer.exe' }),
        `\\a\\${GOT_BY_PATH}`,
      );

      // After changing priority to ['a', 'b'], 'b' should now have priority
      assertEquals(
        ctx.withActives(['a', 'b']).instance.getIconPath({ path: 'C:\\Windows\\explorer.exe' }),
        `\\b\\${GOT_BY_PATH}`,
      );
    });

    await t.step('should prioritize UMID over path matching', () => {
      const ctx = new IconPackManagerTestContext(['b', 'a']); // 'a' has priority
      // Should match UMID in packA even though path exists in both packs
      assertEquals(
        ctx.instance.getIconPath({
          path: 'C:\\Program Files (x86)\\Microsoft\\Edge\\msedge.exe',
          umid: 'MSEdge',
        }),
        `\\a\\${GOT_BY_UMID}`,
      );
    });

    await t.step('should match by filename when higher priority pack has filename match', () => {
      // With ['b', 'a'] order, packB has filename match that should take priority
      const ctx = new IconPackManagerTestContext(['a', 'b']);
      assertEquals(
        ctx.instance.getIconPath({ path: 'C:\\Program Files (x86)\\Some\\App\\filenameApp.exe' }),
        `\\b\\${GOT_BY_FILENAME}`,
      );
    });

    await t.step('should match files by extension with priority order', () => {
      const ctx = new IconPackManagerTestContext(['b', 'a']); // 'a' has priority

      // .txt exists in both packs - should use 'a' (higher priority)
      assertEquals(
        ctx.instance.getIconPath({ path: 'C:\\Some\\App\\someFile.txt' }),
        `\\a\\${GOT_BY_EXTENSION}`,
      );

      // .png only exists in packA
      assertEquals(
        ctx.instance.getIconPath({ path: 'C:\\Some\\App\\someFile.png' }),
        `\\a\\${GOT_BY_EXTENSION}`,
      );

      // When we change priority to ['a', 'b'], 'b' should have priority for .txt
      assertEquals(
        ctx.withActives(['a', 'b']).instance.getIconPath({ path: 'C:\\Some\\App\\someFile.txt' }),
        `\\b\\${GOT_BY_EXTENSION}`,
      );
    });
  });

  await t.step('Missing icon functionality', async (t) => {
    await t.step('should return missing icon from highest priority pack (last in active list)', () => {
      // With ['b', 'a'], 'a' has priority
      const ctx = new IconPackManagerTestContext(['b', 'a']);
      assertEquals(ctx.instance.getMissingIconPath(), `\\a\\MissingIconA.png`);
    });

    await t.step('should fallback when higher priority pack has no missing icon', () => {
      // packC has no missing icon, should fallback to packB
      const ctx = new IconPackManagerTestContext(['c', 'b']);
      assertEquals(ctx.instance.getMissingIconPath(), `\\b\\MissingIconB.png`);
    });

    await t.step('should return null when no active packs have missing icons', () => {
      const ctx = new IconPackManagerTestContext(['c']); // packC has no missing icon
      assertNull(ctx.instance.getMissingIconPath());
    });
  });

  await t.step('Custom icon functionality', async (t) => {
    await t.step('should return custom icon from highest priority pack', () => {
      // With ['b', 'a'], 'a' has priority
      const ctx = new IconPackManagerTestContext(['b', 'a']);
      assertEquals(ctx.instance.getCustomIconPath('my-custom-icon'), `\\a\\CustomA.png`);
    });

    await t.step('should fallback when custom icon not found in higher priority pack', () => {
      // packC has no custom icons, should fallback to packA
      const ctx = new IconPackManagerTestContext(['c', 'a']);
      assertEquals(ctx.instance.getCustomIconPath('my-custom-icon'), `\\a\\CustomA.png`);
    });

    await t.step('should return null when custom icon not found in any active pack', () => {
      const ctx = new IconPackManagerTestContext(['c']);
      assertNull(ctx.instance.getCustomIconPath('non-existent-icon'));
    });
  });
});
