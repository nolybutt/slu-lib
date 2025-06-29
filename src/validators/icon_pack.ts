import { z } from 'zod';

export default z.object({
  'downloaded': z.boolean().describe('Indicates if the icon pack icons was downloaded from `remote_entries`').default(
    false,
  ),
  'entries': z.array(
    z.any().superRefine((x, ctx) => {
      const schemas = [
        z.object({
          'icon': z.union([
            z.object({
              'base': z.union([
                z.string().describe(
                  'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
                ),
                z.null().describe(
                  'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
                ),
              ]).describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ).optional(),
              'dark': z.union([
                z.string().describe('Alternative icon to use when system theme is dark'),
                z.null().describe('Alternative icon to use when system theme is dark'),
              ]).describe('Alternative icon to use when system theme is dark').optional(),
              'isAproximatelySquare': z.boolean().describe('Whether the icon is a square or not').optional(),
              'light': z.union([
                z.string().describe('Alternative icon to use when system theme is light'),
                z.null().describe('Alternative icon to use when system theme is light'),
              ]).describe('Alternative icon to use when system theme is light').optional(),
              'mask': z.union([
                z.string().describe(
                  'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
                ),
                z.null().describe(
                  'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
                ),
              ]).describe('Mask to be applied over the icon, themes can use this to apply custom colors over the icon.')
                .optional(),
            }).describe('The icon paths in this structure are relative to the icon pack folder.'),
            z.null(),
          ]).optional(),
          'path': z.union([
            z.string().describe(
              'Path or filename of the application, mostly this should be present,\n but cases like PWAs on Edge can have no path and be only an UMID.',
            ),
            z.null().describe(
              'Path or filename of the application, mostly this should be present,\n but cases like PWAs on Edge can have no path and be only an UMID.',
            ),
          ]).describe(
            'Path or filename of the application, mostly this should be present,\n but cases like PWAs on Edge can have no path and be only an UMID.',
          ).optional(),
          'redirect': z.union([
            z.string().describe(
              'In case of path be a lnk file this can be set to a different location to use the icon from.\n If present, icon on this entry will be ignored',
            ),
            z.null().describe(
              'In case of path be a lnk file this can be set to a different location to use the icon from.\n If present, icon on this entry will be ignored',
            ),
          ]).describe(
            'In case of path be a lnk file this can be set to a different location to use the icon from.\n If present, icon on this entry will be ignored',
          ).optional(),
          'umid': z.union([
            z.string().describe('Application user model id'),
            z.null().describe('Application user model id'),
          ]).describe('Application user model id').optional(),
        }).describe(
          'Key can be user model id, filename or a full path.\n In case of path this should be an executable or a lnk file or any other file that can\n have an unique/individual icon as are the applications, otherwise use `shared`.',
        ),
        z.object({
          'extension': z.string().describe('File extension without the dot, e.g. "txt"'),
          'icon': z.object({
            'base': z.union([
              z.string().describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ),
              z.null().describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ),
            ]).describe(
              'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
            ).optional(),
            'dark': z.union([
              z.string().describe('Alternative icon to use when system theme is dark'),
              z.null().describe('Alternative icon to use when system theme is dark'),
            ]).describe('Alternative icon to use when system theme is dark').optional(),
            'isAproximatelySquare': z.boolean().describe('Whether the icon is a square or not').optional(),
            'light': z.union([
              z.string().describe('Alternative icon to use when system theme is light'),
              z.null().describe('Alternative icon to use when system theme is light'),
            ]).describe('Alternative icon to use when system theme is light').optional(),
            'mask': z.union([
              z.string().describe(
                'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
              ),
              z.null().describe(
                'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
              ),
            ]).describe('Mask to be applied over the icon, themes can use this to apply custom colors over the icon.')
              .optional(),
          }).describe('The icon paths in this structure are relative to the icon pack folder.'),
        }).describe('Intended to store file icons by extension'),
        z.object({
          'icon': z.object({
            'base': z.union([
              z.string().describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ),
              z.null().describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ),
            ]).describe(
              'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
            ).optional(),
            'dark': z.union([
              z.string().describe('Alternative icon to use when system theme is dark'),
              z.null().describe('Alternative icon to use when system theme is dark'),
            ]).describe('Alternative icon to use when system theme is dark').optional(),
            'isAproximatelySquare': z.boolean().describe('Whether the icon is a square or not').optional(),
            'light': z.union([
              z.string().describe('Alternative icon to use when system theme is light'),
              z.null().describe('Alternative icon to use when system theme is light'),
            ]).describe('Alternative icon to use when system theme is light').optional(),
            'mask': z.union([
              z.string().describe(
                'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
              ),
              z.null().describe(
                'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
              ),
            ]).describe('Mask to be applied over the icon, themes can use this to apply custom colors over the icon.')
              .optional(),
          }).describe('The icon paths in this structure are relative to the icon pack folder.'),
          'key': z.string().describe(
            'we recomend following the widget id + icon name to avoid collisions\n e.g. "@username/widgetid::iconname" but you can use whatever you want',
          ),
        }).describe('Here specific/custom icons for widgets can be stored.'),
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
  ).describe('Icons defined in this icon pack').default([]),
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
  'missing': z.union([
    z.object({
      'base': z.union([
        z.string().describe(
          'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
        ),
        z.null().describe(
          'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
        ),
      ]).describe(
        'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
      ).optional(),
      'dark': z.union([
        z.string().describe('Alternative icon to use when system theme is dark'),
        z.null().describe('Alternative icon to use when system theme is dark'),
      ]).describe('Alternative icon to use when system theme is dark').optional(),
      'isAproximatelySquare': z.boolean().describe('Whether the icon is a square or not').optional(),
      'light': z.union([
        z.string().describe('Alternative icon to use when system theme is light'),
        z.null().describe('Alternative icon to use when system theme is light'),
      ]).describe('Alternative icon to use when system theme is light').optional(),
      'mask': z.union([
        z.string().describe(
          'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
        ),
        z.null().describe(
          'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
        ),
      ]).describe('Mask to be applied over the icon, themes can use this to apply custom colors over the icon.')
        .optional(),
    }).describe('The icon paths in this structure are relative to the icon pack folder.'),
    z.null(),
  ]).describe('Special icon used when some other icon is not found').default(null),
  'remoteEntries': z.array(
    z.any().superRefine((x, ctx) => {
      const schemas = [
        z.object({
          'icon': z.union([
            z.object({
              'base': z.union([
                z.string().describe(
                  'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
                ),
                z.null().describe(
                  'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
                ),
              ]).describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ).optional(),
              'dark': z.union([
                z.string().describe('Alternative icon to use when system theme is dark'),
                z.null().describe('Alternative icon to use when system theme is dark'),
              ]).describe('Alternative icon to use when system theme is dark').optional(),
              'isAproximatelySquare': z.boolean().describe('Whether the icon is a square or not').optional(),
              'light': z.union([
                z.string().describe('Alternative icon to use when system theme is light'),
                z.null().describe('Alternative icon to use when system theme is light'),
              ]).describe('Alternative icon to use when system theme is light').optional(),
              'mask': z.union([
                z.string().describe(
                  'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
                ),
                z.null().describe(
                  'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
                ),
              ]).describe('Mask to be applied over the icon, themes can use this to apply custom colors over the icon.')
                .optional(),
            }).describe('The icon paths in this structure are relative to the icon pack folder.'),
            z.null(),
          ]).optional(),
          'path': z.union([
            z.string().describe(
              'Path or filename of the application, mostly this should be present,\n but cases like PWAs on Edge can have no path and be only an UMID.',
            ),
            z.null().describe(
              'Path or filename of the application, mostly this should be present,\n but cases like PWAs on Edge can have no path and be only an UMID.',
            ),
          ]).describe(
            'Path or filename of the application, mostly this should be present,\n but cases like PWAs on Edge can have no path and be only an UMID.',
          ).optional(),
          'redirect': z.union([
            z.string().describe(
              'In case of path be a lnk file this can be set to a different location to use the icon from.\n If present, icon on this entry will be ignored',
            ),
            z.null().describe(
              'In case of path be a lnk file this can be set to a different location to use the icon from.\n If present, icon on this entry will be ignored',
            ),
          ]).describe(
            'In case of path be a lnk file this can be set to a different location to use the icon from.\n If present, icon on this entry will be ignored',
          ).optional(),
          'umid': z.union([
            z.string().describe('Application user model id'),
            z.null().describe('Application user model id'),
          ]).describe('Application user model id').optional(),
        }).describe(
          'Key can be user model id, filename or a full path.\n In case of path this should be an executable or a lnk file or any other file that can\n have an unique/individual icon as are the applications, otherwise use `shared`.',
        ),
        z.object({
          'extension': z.string().describe('File extension without the dot, e.g. "txt"'),
          'icon': z.object({
            'base': z.union([
              z.string().describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ),
              z.null().describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ),
            ]).describe(
              'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
            ).optional(),
            'dark': z.union([
              z.string().describe('Alternative icon to use when system theme is dark'),
              z.null().describe('Alternative icon to use when system theme is dark'),
            ]).describe('Alternative icon to use when system theme is dark').optional(),
            'isAproximatelySquare': z.boolean().describe('Whether the icon is a square or not').optional(),
            'light': z.union([
              z.string().describe('Alternative icon to use when system theme is light'),
              z.null().describe('Alternative icon to use when system theme is light'),
            ]).describe('Alternative icon to use when system theme is light').optional(),
            'mask': z.union([
              z.string().describe(
                'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
              ),
              z.null().describe(
                'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
              ),
            ]).describe('Mask to be applied over the icon, themes can use this to apply custom colors over the icon.')
              .optional(),
          }).describe('The icon paths in this structure are relative to the icon pack folder.'),
        }).describe('Intended to store file icons by extension'),
        z.object({
          'icon': z.object({
            'base': z.union([
              z.string().describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ),
              z.null().describe(
                'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
              ),
            ]).describe(
              'Icon to use if no light or dark icon is specified, if both light and dark are specified this can be omitted',
            ).optional(),
            'dark': z.union([
              z.string().describe('Alternative icon to use when system theme is dark'),
              z.null().describe('Alternative icon to use when system theme is dark'),
            ]).describe('Alternative icon to use when system theme is dark').optional(),
            'isAproximatelySquare': z.boolean().describe('Whether the icon is a square or not').optional(),
            'light': z.union([
              z.string().describe('Alternative icon to use when system theme is light'),
              z.null().describe('Alternative icon to use when system theme is light'),
            ]).describe('Alternative icon to use when system theme is light').optional(),
            'mask': z.union([
              z.string().describe(
                'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
              ),
              z.null().describe(
                'Mask to be applied over the icon, themes can use this to apply custom colors over the icon.',
              ),
            ]).describe('Mask to be applied over the icon, themes can use this to apply custom colors over the icon.')
              .optional(),
          }).describe('The icon paths in this structure are relative to the icon pack folder.'),
          'key': z.string().describe(
            'we recomend following the widget id + icon name to avoid collisions\n e.g. "@username/widgetid::iconname" but you can use whatever you want',
          ),
        }).describe('Here specific/custom icons for widgets can be stored.'),
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
  ).describe('This lists will be downloaded and stored locally').default([]),
});
