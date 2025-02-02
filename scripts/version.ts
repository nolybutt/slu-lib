import denoJson from '../deno.json' with { type: 'json' };

const newVersion = Deno.args[0];
if (!newVersion) {
  console.error('Error: No version specified. Usage: deno task update-version <new-version>');
  Deno.exit(1);
}

let cargoToml = await Deno.readTextFile('Cargo.toml');
cargoToml = cargoToml.replace(/^version\s*=\s*".*"/m, `version = "${newVersion}"`);
await Deno.writeTextFile('Cargo.toml', cargoToml);

await new Deno.Command('cargo', {
  args: ['update', '-p', 'seelen-core'],
  stderr: 'inherit',
  stdout: 'inherit',
}).output();

denoJson.version = newVersion;
await Deno.writeTextFile('deno.json', JSON.stringify(denoJson, null, 2));

console.log(`Version updated to ${newVersion}`);

// add to git
await new Deno.Command('git', {
  args: ['add', 'Cargo.toml', 'Cargo.lock', 'deno.json'],
  stderr: 'inherit',
  stdout: 'inherit',
}).output();

await new Deno.Command('git', {
  args: ['commit', '-m', `chore(release): v${newVersion}`],
  stderr: 'inherit',
  stdout: 'inherit',
}).output();

await new Deno.Command('git', {
  args: ['tag', '-s', `v${newVersion}`, '-m', `v${newVersion}`],
  stderr: 'inherit',
  stdout: 'inherit',
}).output();
