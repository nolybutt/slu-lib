import { z } from 'zod';

export default z.object({
  'css': z.union([z.string().describe('Optional widget css'), z.null().describe('Optional widget css')]).describe(
    'Optional widget css',
  ).default(null),
  'html': z.union([z.string().describe('Optional widget html'), z.null().describe('Optional widget html')]).describe(
    'Optional widget html',
  ).default(null),
  'icon': z.union([
    z.string().describe(
      'Optional icon to be used on settings. This have to be a valid react icon name.\\\n You can find all icons here: https://react-icons.github.io/react-icons/.',
    ),
    z.null().describe(
      'Optional icon to be used on settings. This have to be a valid react icon name.\\\n You can find all icons here: https://react-icons.github.io/react-icons/.',
    ),
  ]).describe(
    'Optional icon to be used on settings. This have to be a valid react icon name.\\\n You can find all icons here: https://react-icons.github.io/react-icons/.',
  ).default(null),
  'id': z.string().describe(
    'Visual id composed of the creator username and the resource name. e.g. `@username/resource-name`',
  ).optional(),
  'instances': z.any().superRefine((x, ctx) => {
    const schemas = [
      z.literal('Single').describe(
        'Default behavior, only one instance of this widget is allowed.\n This is useful for widgets intended to work as custom config window.',
      ),
      z.literal('Multiple').describe(
        'The widget is allowed to have multiple instances.\\\n This allow to the user manually create more instances of this same widget.',
      ),
      z.literal('ReplicaByMonitor').describe(
        'Seelen UI will create an instance of this widget per each monitor connected.\\\n This can be configured by the user using per monitor settings.\\',
      ),
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
  }).optional(),
  'js': z.union([z.string().describe('Optional widget js code'), z.null().describe('Optional widget js code')])
    .describe('Optional widget js code').default(null),
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
    z.object({
      'group': z.array(
        z.object({
          'children': z.array(z.any()).describe('List of items in this subgroup').default([]),
          'config': z.any().superRefine((x, ctx) => {
            const schemas = [
              z.object({
                'allowSetByMonitor': z.boolean().describe(
                  'This setting could be set by monitor on the settings by monitor section.',
                ).default(false),
                'defaultValue': z.boolean().default(false),
                'dependencies': z.array(z.string()).describe(
                  'Keys of items to be set in order to enable this item.\n\n it uses js logic (!!value) to determine if the item is enabled',
                ).default([]),
                'key': z.string().describe(
                  'Unique key for this item, used to identify it in the settings, should be unique.\\\n If duplicated, duplicated items will be ignored.',
                ),
                'label': z.union([z.string(), z.record(z.string())]).describe(
                  'Map of language code as key an translated values. Could be a string, mapped to `en`.',
                ),
              }),
              z.object({
                'allowSetByMonitor': z.boolean().describe(
                  'This setting could be set by monitor on the settings by monitor section.',
                ).default(false),
                'defaultValue': z.string().default(''),
                'dependencies': z.array(z.string()).describe(
                  'Keys of items to be set in order to enable this item.\n\n it uses js logic (!!value) to determine if the item is enabled',
                ).default([]),
                'key': z.string().describe(
                  'Unique key for this item, used to identify it in the settings, should be unique.\\\n If duplicated, duplicated items will be ignored.',
                ),
                'label': z.union([z.string(), z.record(z.string())]).describe(
                  'Map of language code as key an translated values. Could be a string, mapped to `en`.',
                ),
                'options': z.array(z.object({
                  'icon': z.union([z.string().describe('react icon name'), z.null().describe('react icon name')])
                    .describe('react icon name').optional(),
                  'label': z.union([z.string(), z.record(z.string())]).describe(
                    'Map of language code as key an translated values. Could be a string, mapped to `en`.',
                  ),
                  'value': z.string().describe('The value to be set when this option is selected, should be unique'),
                })),
                'subtype': z.enum(['List', 'Inline']),
              }),
              z.object({
                'allowSetByMonitor': z.boolean().describe(
                  'This setting could be set by monitor on the settings by monitor section.',
                ).default(false),
                'defaultValue': z.string().default(''),
                'dependencies': z.array(z.string()).describe(
                  'Keys of items to be set in order to enable this item.\n\n it uses js logic (!!value) to determine if the item is enabled',
                ).default([]),
                'key': z.string().describe(
                  'Unique key for this item, used to identify it in the settings, should be unique.\\\n If duplicated, duplicated items will be ignored.',
                ),
                'label': z.union([z.string(), z.record(z.string())]).describe(
                  'Map of language code as key an translated values. Could be a string, mapped to `en`.',
                ),
              }),
              z.object({
                'allowSetByMonitor': z.boolean().describe(
                  'This setting could be set by monitor on the settings by monitor section.',
                ).default(false),
                'defaultValue': z.number().default(0),
                'dependencies': z.array(z.string()).describe(
                  'Keys of items to be set in order to enable this item.\n\n it uses js logic (!!value) to determine if the item is enabled',
                ).default([]),
                'key': z.string().describe(
                  'Unique key for this item, used to identify it in the settings, should be unique.\\\n If duplicated, duplicated items will be ignored.',
                ),
                'label': z.union([z.string(), z.record(z.string())]).describe(
                  'Map of language code as key an translated values. Could be a string, mapped to `en`.',
                ),
                'max': z.union([z.number(), z.null()]).optional(),
                'min': z.union([z.number(), z.null()]).optional(),
              }),
              z.object({
                'allowSetByMonitor': z.boolean().describe(
                  'This setting could be set by monitor on the settings by monitor section.',
                ).default(false),
                'defaultValue': z.number().default(0),
                'dependencies': z.array(z.string()).describe(
                  'Keys of items to be set in order to enable this item.\n\n it uses js logic (!!value) to determine if the item is enabled',
                ).default([]),
                'from': z.number(),
                'key': z.string().describe(
                  'Unique key for this item, used to identify it in the settings, should be unique.\\\n If duplicated, duplicated items will be ignored.',
                ),
                'label': z.union([z.string(), z.record(z.string())]).describe(
                  'Map of language code as key an translated values. Could be a string, mapped to `en`.',
                ),
                'step': z.union([z.number(), z.null()]).optional(),
                'to': z.number(),
              }),
              z.object({
                'allowAlpha': z.boolean(),
                'allowSetByMonitor': z.boolean().describe(
                  'This setting could be set by monitor on the settings by monitor section.',
                ).default(false),
                'defaultValue': z.string().default(''),
                'dependencies': z.array(z.string()).describe(
                  'Keys of items to be set in order to enable this item.\n\n it uses js logic (!!value) to determine if the item is enabled',
                ).default([]),
                'key': z.string().describe(
                  'Unique key for this item, used to identify it in the settings, should be unique.\\\n If duplicated, duplicated items will be ignored.',
                ),
                'label': z.union([z.string(), z.record(z.string())]).describe(
                  'Map of language code as key an translated values. Could be a string, mapped to `en`.',
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
        }),
      ).describe('List of items in this group'),
    }),
  ).describe(
    'The Widget Settings Declaration is a list of groups\n each group is a list of items and can have subgroups with headers.\n\n This declarations will be used to render and store the settings of the widget on a\n friendy way for the users, also will match the styles of the settings window.\n\n With this, custom windows or widgets to configure an specific widget are not needed.',
  ).optional(),
});
