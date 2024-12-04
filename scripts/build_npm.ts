/// <reference lib="deno.ns" />

import { build, type BuildOptions, emptyDir } from '@deno/dnt';

import denoJson from '../deno.json' with { type: 'json' };

const { name, description, version, license } = denoJson;
const packageJson: BuildOptions['package'] = {
  name,
  description,
  version,
  license,
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
};

await emptyDir('./npm');

await build({
  typeCheck: 'both',
  compilerOptions: {
    lib: ['DOM', 'DOM.Iterable', 'ES2022'],
    target: 'ES2022',
  },
  test: false,
  entryPoints: ['./src/lib.ts'],
  outDir: './npm',
  shims: {},
  package: packageJson,
  postBuild() {
    Deno.copyFileSync('LICENSE', 'npm/LICENSE');
    Deno.copyFileSync('readme.md', 'npm/readme.md');
  },
});
