await Deno.mkdir('./src/types', { recursive: true });
const bindingsPath = await Deno.realPath('./src/types');

console.log('[Task] Removing old bindings...');
await Deno.remove(bindingsPath, { recursive: true });

console.log('[Task] Generating new bindings...');
// yeah cargo test generates the typescript bindings, why? ask to @aleph-alpha/ts-rs xd
// btw internally we also decided to use tests to avoid having a binary.
await new Deno.Command('cargo', {
  args: ['test', '--no-default-features'],
  stderr: 'inherit',
  stdout: 'inherit',
}).output();

console.log('[Task] Creating mod.ts...');
const mod = await Deno.open(`${bindingsPath}/mod.ts`, {
  create: true,
  append: true,
});

for (const entry of Deno.readDirSync(bindingsPath)) {
  if (entry.isFile && entry.name.endsWith('.ts') && entry.name !== 'mod.ts') {
    await mod.write(new TextEncoder().encode(`export * from './${entry.name}';\n`));
  }
}

console.log('[Task] Extracting Types Definitions...');
const doc = await new Deno.Command('deno', {
  args: ['doc', '--json', '--private', `${bindingsPath}/mod.ts`],
  stderr: 'inherit',
  stdout: 'piped',
}).output();
const docJson = JSON.parse(new TextDecoder().decode(doc.stdout));
await Deno.writeTextFile('./gen/doc-types.json', JSON.stringify(docJson, null, 2));

console.log('[Task] Formatting...');
await new Deno.Command('cargo', { args: ['fmt'], stderr: 'inherit', stdout: 'inherit' }).output();
await new Deno.Command('deno', { args: ['fmt'], stderr: 'inherit', stdout: 'inherit' }).output();

console.log('[Task] Done!');
