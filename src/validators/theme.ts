import { z } from 'zod';

export default z.object({
  'id': z.string().describe(
    'Visual id composed of the creator username and the resource name. e.g. `@username/resource-name`',
  ).optional(),
  'metadata': z.object({
    'description': z.union([z.string(), z.record(z.string())]).describe(
      'Map of language code as key an translated values. Could be a string, mapped to `en`.',
    ).optional(),
    'appTargetVersion': z.union([
      z.array(z.any()).min(3).max(3).describe(
        'App target version that this resource is compatible with.\\\n Developers are responsible to update the resource so when resource does not\n match the current app version, the resource will be shown with a warning message',
      ),
      z.null().describe(
        'App target version that this resource is compatible with.\\\n Developers are responsible to update the resource so when resource does not\n match the current app version, the resource will be shown with a warning message',
      ),
    ]).describe(
      'App target version that this resource is compatible with.\\\n Developers are responsible to update the resource so when resource does not\n match the current app version, the resource will be shown with a warning message',
    ).default(null),
    'banner': z.union([
      z.string().url().describe('Banner image with aspect ratio of 21/9, this is used when promoting the resource.'),
      z.null().describe('Banner image with aspect ratio of 21/9, this is used when promoting the resource.'),
    ]).describe('Banner image with aspect ratio of 21/9, this is used when promoting the resource.').default(null),
    'displayName': z.union([z.string(), z.record(z.string())]).describe(
      'Map of language code as key an translated values. Could be a string, mapped to `en`.',
    ).optional(),
    'portrait': z.union([
      z.string().url().describe('Portrait image with aspect ratio of 1/1'),
      z.null().describe('Portrait image with aspect ratio of 1/1'),
    ]).describe('Portrait image with aspect ratio of 1/1').default(null),
    'screenshots': z.array(z.string().url()).describe('Screenshots should use aspect ratio of 16/9').default([]),
    'tags': z.array(z.string()).describe('tags are keywords to be used for searching and indexing').default([]),
  }).optional(),
  'settings': z.array(
    z.any().superRefine((x, ctx) => {
      const schemas = [
        z.object({
          'initialValue': z.string().describe('initial variable value, if not manually set by the user.'),
          'label': z.union([z.string(), z.record(z.string())]).describe(
            'Map of language code as key an translated values. Could be a string, mapped to `en`.',
          ),
          'name': z.string().describe(
            'Valid CSS variable name that starts with `--` and follows CSS naming conventions',
          ),
        }),
        z.object({
          'initialValue': z.string().describe('initial variable value, if not manually set by the user.'),
          'label': z.union([z.string(), z.record(z.string())]).describe(
            'Map of language code as key an translated values. Could be a string, mapped to `en`.',
          ),
          'name': z.string().describe(
            'Valid CSS variable name that starts with `--` and follows CSS naming conventions',
          ),
        }),
        z.object({
          'initialValue': z.number().describe('initial variable value, if not manually set by the user.'),
          'initialValueUnit': z.string().describe('Css unit, example: `px`'),
          'label': z.union([z.string(), z.record(z.string())]).describe(
            'Map of language code as key an translated values. Could be a string, mapped to `en`.',
          ),
          'name': z.string().describe(
            'Valid CSS variable name that starts with `--` and follows CSS naming conventions',
          ),
        }),
        z.object({
          'initialValue': z.number().describe('initial variable value, if not manually set by the user.'),
          'label': z.union([z.string(), z.record(z.string())]).describe(
            'Map of language code as key an translated values. Could be a string, mapped to `en`.',
          ),
          'name': z.string().describe(
            'Valid CSS variable name that starts with `--` and follows CSS naming conventions',
          ),
        }),
        z.object({
          'initialValue': z.string().url().describe('initial variable value, if not manually set by the user.'),
          'label': z.union([z.string(), z.record(z.string())]).describe(
            'Map of language code as key an translated values. Could be a string, mapped to `en`.',
          ),
          'name': z.string().describe(
            'Valid CSS variable name that starts with `--` and follows CSS naming conventions',
          ),
        }),
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
  ).optional(),
  'styles': z.record(z.string()).describe('Css Styles of the theme').default({}),
});
