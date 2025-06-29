import { z } from 'zod';

export default z.array(z.object({
  'boundMonitor': z.union([
    z.number().int().gte(0).describe('monitor index that the app should be bound to'),
    z.null().describe('monitor index that the app should be bound to'),
  ]).describe('monitor index that the app should be bound to').optional(),
  'boundWorkspace': z.union([
    z.number().int().gte(0).describe('workspace index that the app should be bound to'),
    z.null().describe('workspace index that the app should be bound to'),
  ]).describe('workspace index that the app should be bound to').optional(),
  'category': z.union([
    z.string().describe('category to group the app under'),
    z.null().describe('category to group the app under'),
  ]).describe('category to group the app under').optional(),
  'identifier': z.object({
    'and': z.array(z.any()).default([]),
    'id': z.string().describe(
      'Depending of the kind this can be case sensitive or not.\n - `class` and `title` are case sensitive\n - `exe` and `path` are case insensitive',
    ),
    'kind': z.enum(['Exe', 'Class', 'Title', 'Path']),
    'matchingStrategy': z.enum(['Equals', 'StartsWith', 'EndsWith', 'Contains', 'Regex']),
    'negation': z.boolean().default(false),
    'or': z.array(z.any()).default([]),
  }),
  'isBundled': z.boolean().describe('is this config bundled with seelen ui.').default(false),
  'name': z.string().describe('name of the app'),
  'options': z.array(
    z.any().superRefine((x, ctx) => {
      const schemas = [
        z.literal('float').describe('Start the app in the center of the screen as floating in the wm.'),
        z.literal('force').describe('Force manage this app in the wm.'),
        z.literal('unmanage').describe('Unmanage this app in the wm.'),
        z.literal('pinned').describe('Pin this app in all the virtual desktops in the wm.'),
        z.literal('hidden').describe('Hide this app on the dock/taskbar.'),
      ];
      const errors = schemas.reduce<z.ZodError[]>(
        (errors, schema) =>
          ((result) => result.error ? [...errors, result.error] : errors)(
            schema.safeParse(x),
          ),
        [],
      );
      if (schemas.length - errors.length !== 1) {
        ctx.addIssue({
          path: ctx.path,
          code: 'invalid_union',
          unionErrors: errors,
          message: 'Invalid input: Should pass single schema',
        });
      }
    }),
  ).describe('extra specific options/settings for the app').default([]),
}));
