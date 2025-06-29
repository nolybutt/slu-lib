import { z } from 'zod';

export default z.object({
  'center': z.array(
    z.any().superRefine((x, ctx) => {
      const schemas = [
        z.object({
          'displayName': z.string().describe('display name of the item').default(''),
          'id': z.string().describe('internal UUID to differentiate items').default(''),
          'isDir': z.boolean().describe('@deprecaed will be removed in v3, use subtype `Folder` instead.').optional(),
          'path': z.string().describe('path to file, forder or program.').default(''),
          'relaunchArgs': z.union([z.union([z.array(z.string()), z.string()]), z.null()]).describe(
            'arguments to be passed to the relaunch program',
          ).default(null),
          'relaunchCommand': z.union([
            z.string().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
            z.null().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
          ]).describe('@deprecaed will be removed in v3, use relaunch_program instead.').optional(),
          'relaunchIn': z.union([
            z.string().describe('path where ejecute the relaunch command'),
            z.null().describe('path where ejecute the relaunch command'),
          ]).describe('path where ejecute the relaunch command').default(null),
          'relaunchProgram': z.string().describe('program to be executed').default(''),
          'subtype': z.any().superRefine((x, ctx) => {
            const schemas = [
              z.enum(['File', 'Folder', 'App']),
              z.literal('UnknownV2_1_6').describe('this is used for backward compatibility, will be removed in v3'),
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
          'umid': z.union([
            z.string().describe('Application user model id.'),
            z.null().describe('Application user model id.'),
          ]).describe('Application user model id.').default(null),
        }),
        z.object({
          'displayName': z.string().describe('display name of the item').default(''),
          'id': z.string().describe('internal UUID to differentiate items').default(''),
          'isDir': z.boolean().describe('@deprecaed will be removed in v3, use subtype `Folder` instead.').optional(),
          'path': z.string().describe('path to file, forder or program.').default(''),
          'relaunchArgs': z.union([z.union([z.array(z.string()), z.string()]), z.null()]).describe(
            'arguments to be passed to the relaunch program',
          ).default(null),
          'relaunchCommand': z.union([
            z.string().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
            z.null().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
          ]).describe('@deprecaed will be removed in v3, use relaunch_program instead.').optional(),
          'relaunchIn': z.union([
            z.string().describe('path where ejecute the relaunch command'),
            z.null().describe('path where ejecute the relaunch command'),
          ]).describe('path where ejecute the relaunch command').default(null),
          'relaunchProgram': z.string().describe('program to be executed').default(''),
          'subtype': z.any().superRefine((x, ctx) => {
            const schemas = [
              z.enum(['File', 'Folder', 'App']),
              z.literal('UnknownV2_1_6').describe('this is used for backward compatibility, will be removed in v3'),
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
          'umid': z.union([
            z.string().describe('Application user model id.'),
            z.null().describe('Application user model id.'),
          ]).describe('Application user model id.').default(null),
        }),
        z.object({ 'type': z.literal('Separator'), 'id': z.string() }),
        z.object({ 'type': z.literal('Media'), 'id': z.string() }),
        z.object({ 'type': z.literal('StartMenu'), 'id': z.string() }),
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
  ).default([{
    'type': 'Pinned',
    'displayName': 'Explorer',
    'id': '',
    'path': 'C:\\Windows\\explorer.exe',
    'pinDisabled': false,
    'relaunchArgs': null,
    'relaunchIn': null,
    'relaunchProgram': 'C:\\Windows\\explorer.exe',
    'subtype': 'App',
    'umid': null,
    'windows': [],
  }]),
  'isReorderDisabled': z.boolean().describe('Whether the reordering possible on the weg').default(false),
  'left': z.array(
    z.any().superRefine((x, ctx) => {
      const schemas = [
        z.object({
          'displayName': z.string().describe('display name of the item').default(''),
          'id': z.string().describe('internal UUID to differentiate items').default(''),
          'isDir': z.boolean().describe('@deprecaed will be removed in v3, use subtype `Folder` instead.').optional(),
          'path': z.string().describe('path to file, forder or program.').default(''),
          'relaunchArgs': z.union([z.union([z.array(z.string()), z.string()]), z.null()]).describe(
            'arguments to be passed to the relaunch program',
          ).default(null),
          'relaunchCommand': z.union([
            z.string().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
            z.null().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
          ]).describe('@deprecaed will be removed in v3, use relaunch_program instead.').optional(),
          'relaunchIn': z.union([
            z.string().describe('path where ejecute the relaunch command'),
            z.null().describe('path where ejecute the relaunch command'),
          ]).describe('path where ejecute the relaunch command').default(null),
          'relaunchProgram': z.string().describe('program to be executed').default(''),
          'subtype': z.any().superRefine((x, ctx) => {
            const schemas = [
              z.enum(['File', 'Folder', 'App']),
              z.literal('UnknownV2_1_6').describe('this is used for backward compatibility, will be removed in v3'),
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
          'umid': z.union([
            z.string().describe('Application user model id.'),
            z.null().describe('Application user model id.'),
          ]).describe('Application user model id.').default(null),
        }),
        z.object({
          'displayName': z.string().describe('display name of the item').default(''),
          'id': z.string().describe('internal UUID to differentiate items').default(''),
          'isDir': z.boolean().describe('@deprecaed will be removed in v3, use subtype `Folder` instead.').optional(),
          'path': z.string().describe('path to file, forder or program.').default(''),
          'relaunchArgs': z.union([z.union([z.array(z.string()), z.string()]), z.null()]).describe(
            'arguments to be passed to the relaunch program',
          ).default(null),
          'relaunchCommand': z.union([
            z.string().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
            z.null().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
          ]).describe('@deprecaed will be removed in v3, use relaunch_program instead.').optional(),
          'relaunchIn': z.union([
            z.string().describe('path where ejecute the relaunch command'),
            z.null().describe('path where ejecute the relaunch command'),
          ]).describe('path where ejecute the relaunch command').default(null),
          'relaunchProgram': z.string().describe('program to be executed').default(''),
          'subtype': z.any().superRefine((x, ctx) => {
            const schemas = [
              z.enum(['File', 'Folder', 'App']),
              z.literal('UnknownV2_1_6').describe('this is used for backward compatibility, will be removed in v3'),
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
          'umid': z.union([
            z.string().describe('Application user model id.'),
            z.null().describe('Application user model id.'),
          ]).describe('Application user model id.').default(null),
        }),
        z.object({ 'type': z.literal('Separator'), 'id': z.string() }),
        z.object({ 'type': z.literal('Media'), 'id': z.string() }),
        z.object({ 'type': z.literal('StartMenu'), 'id': z.string() }),
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
  ).default([{ 'type': 'StartMenu', 'id': '' }]),
  'right': z.array(
    z.any().superRefine((x, ctx) => {
      const schemas = [
        z.object({
          'displayName': z.string().describe('display name of the item').default(''),
          'id': z.string().describe('internal UUID to differentiate items').default(''),
          'isDir': z.boolean().describe('@deprecaed will be removed in v3, use subtype `Folder` instead.').optional(),
          'path': z.string().describe('path to file, forder or program.').default(''),
          'relaunchArgs': z.union([z.union([z.array(z.string()), z.string()]), z.null()]).describe(
            'arguments to be passed to the relaunch program',
          ).default(null),
          'relaunchCommand': z.union([
            z.string().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
            z.null().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
          ]).describe('@deprecaed will be removed in v3, use relaunch_program instead.').optional(),
          'relaunchIn': z.union([
            z.string().describe('path where ejecute the relaunch command'),
            z.null().describe('path where ejecute the relaunch command'),
          ]).describe('path where ejecute the relaunch command').default(null),
          'relaunchProgram': z.string().describe('program to be executed').default(''),
          'subtype': z.any().superRefine((x, ctx) => {
            const schemas = [
              z.enum(['File', 'Folder', 'App']),
              z.literal('UnknownV2_1_6').describe('this is used for backward compatibility, will be removed in v3'),
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
          'umid': z.union([
            z.string().describe('Application user model id.'),
            z.null().describe('Application user model id.'),
          ]).describe('Application user model id.').default(null),
        }),
        z.object({
          'displayName': z.string().describe('display name of the item').default(''),
          'id': z.string().describe('internal UUID to differentiate items').default(''),
          'isDir': z.boolean().describe('@deprecaed will be removed in v3, use subtype `Folder` instead.').optional(),
          'path': z.string().describe('path to file, forder or program.').default(''),
          'relaunchArgs': z.union([z.union([z.array(z.string()), z.string()]), z.null()]).describe(
            'arguments to be passed to the relaunch program',
          ).default(null),
          'relaunchCommand': z.union([
            z.string().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
            z.null().describe('@deprecaed will be removed in v3, use relaunch_program instead.'),
          ]).describe('@deprecaed will be removed in v3, use relaunch_program instead.').optional(),
          'relaunchIn': z.union([
            z.string().describe('path where ejecute the relaunch command'),
            z.null().describe('path where ejecute the relaunch command'),
          ]).describe('path where ejecute the relaunch command').default(null),
          'relaunchProgram': z.string().describe('program to be executed').default(''),
          'subtype': z.any().superRefine((x, ctx) => {
            const schemas = [
              z.enum(['File', 'Folder', 'App']),
              z.literal('UnknownV2_1_6').describe('this is used for backward compatibility, will be removed in v3'),
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
          'umid': z.union([
            z.string().describe('Application user model id.'),
            z.null().describe('Application user model id.'),
          ]).describe('Application user model id.').default(null),
        }),
        z.object({ 'type': z.literal('Separator'), 'id': z.string() }),
        z.object({ 'type': z.literal('Media'), 'id': z.string() }),
        z.object({ 'type': z.literal('StartMenu'), 'id': z.string() }),
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
  ).default([{ 'type': 'Media', 'id': '' }]),
});
