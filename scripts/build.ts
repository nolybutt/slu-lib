/// <reference lib="deno.ns" />

import { build, emptyDir } from '@deno/dnt';

import denoJson from '../deno.json' with { type: 'json' };

const { name, description, version, license } = denoJson;
const packageJson = {
  name,
  description,
  version,
  license,
};

await emptyDir('./npm');

await build({
  typeCheck: 'both',
  compilerOptions: {
    lib: ['DOM', 'DOM.Iterable', 'ES2022'],
    target: 'ES2022',
  },
  entryPoints: ['./src/lib.ts'],
  outDir: './npm',
  shims: {
    crypto: true,
  },
  package: {
    ...packageJson,
    repository: {
      type: 'git',
      url: 'git+https://github.com/Seelen-Inc/slu-lib.git',
    },
    bugs: {
      url: 'https://github.com/Seelen-Inc/slu-lib/issues',
    },
    dependencies: {
      '@tauri-apps/api': '^2.1.1',
    },
  },
  postBuild() {
    Deno.copyFileSync('LICENSE', 'npm/LICENSE');
    Deno.copyFileSync('readme.md', 'npm/readme.md');
  },
});
