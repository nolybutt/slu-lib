import { z } from 'zod';

export default z.object({
  'ahkEnabled': z.boolean().describe('enable or disable ahk').default(true),
  'ahkVariables': z.object({
    'decreaseHeight': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'decreaseWidth': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'focusBottom': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'focusLatest': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'focusLeft': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'focusRight': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'focusTop': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'increaseHeight': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'increaseWidth': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'miscOpenSettings': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'miscToggleLockTracing': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'miscToggleWinEventTracing': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace0': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace1': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace2': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace3': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace4': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace5': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace6': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace7': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace8': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'moveToWorkspace9': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'reserveBottom': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'reserveFloat': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'reserveLeft': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'reserveRight': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'reserveStack': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'reserveTop': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'restoreSizes': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace0': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace1': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace2': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace3': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace4': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace5': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace6': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace7': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace8': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'sendToWorkspace9': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp0': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp1': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp2': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp3': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp4': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp5': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp6': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp7': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp8': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'startWegApp9': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace0': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace1': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace2': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace3': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace4': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace5': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace6': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace7': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace8': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'switchWorkspace9': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
    'toggleLauncher': z.object({
      'ahk': z.string(),
      'devonly': z.boolean().default(false),
      'fancy': z.string(),
      'readonly': z.boolean().default(false),
    }).optional(),
  }).optional(),
  'byTheme': z.record(z.record(z.string())).describe(
    'Custom variables for themes by theme id\n ### example\n ```json\n {\n     "@username/themeName": {\n         "--css-variable-name": "123px",\n         "--css-variable-name2": "#aabbccaa",\n     }\n }\n ```',
  ).default({}),
  'byWidget': z.object({
    '@seelen/fancy-toolbar': z.object({
      'delayToHide': z.number().int().gte(0).describe('delay to hide the toolbar on Mouse Leave in milliseconds')
        .default(800),
      'delayToShow': z.number().int().gte(0).describe('delay to show the toolbar on Mouse Hover in milliseconds')
        .default(100),
      'dynamicColor': z.boolean().describe(
        'enable or disable dynamic color based on maximized focused window (themes can override this)',
      ).default(true),
      'enabled': z.boolean().describe('enable or disable the fancy toolbar').default(true),
      'height': z.number().int().gte(0).describe('height of the fancy toolbar').default(30),
      'hideMode': z.any().superRefine((x, ctx) => {
        const schemas = [
          z.literal('Never').describe('never hide'),
          z.literal('Always').describe('auto-hide always on'),
          z.literal('OnOverlap').describe('auto-hide only if is overlaped by the focused window'),
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
      'position': z.enum(['Top', 'Bottom']).optional(),
      'showHibernateButton': z.boolean().describe('show the hibernate button on power menu').default(false),
    }).optional(),
    '@seelen/launcher': z.object({
      'enabled': z.boolean().default(false),
      'monitor': z.enum(['Primary', 'MouseOver']).optional(),
      'runners': z.array(
        z.object({
          'id': z.string().default(''),
          'label': z.string().default(''),
          'program': z.string().default(''),
          'readonly': z.boolean().default(false),
        }),
      ).default([{
        'id': 'RUN',
        'label': 't:app_launcher.runners.explorer',
        'program': 'explorer.exe',
        'readonly': true,
      }, { 'id': 'CMD', 'label': 't:app_launcher.runners.cmd', 'program': 'cmd.exe', 'readonly': true }]),
    }).optional(),
    '@seelen/wallpaper-manager': z.object({
      'backgrounds': z.array(z.object({ 'id': z.string(), 'path': z.string() })).default([]),
      'enabled': z.boolean().default(true),
      'interval': z.number().int().gte(0).describe('update interval in seconds').default(60),
      'randomize': z.boolean().default(false),
    }).optional(),
    '@seelen/weg': z.object({
      'delayToHide': z.number().int().gte(0).describe('delay to hide the toolbar on Mouse Leave in milliseconds')
        .default(800),
      'delayToShow': z.number().int().gte(0).describe('delay to show the toolbar on Mouse Hover in milliseconds')
        .default(100),
      'enabled': z.boolean().describe('enable or disable the seelenweg').default(true),
      'hideMode': z.any().superRefine((x, ctx) => {
        const schemas = [
          z.literal('Never').describe('never hide'),
          z.literal('Always').describe('auto-hide always on'),
          z.literal('OnOverlap').describe('auto-hide only if is overlaped by the focused window'),
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
      'margin': z.number().int().gte(0).describe('Dock/Taskbar margin in px').default(8),
      'mode': z.enum(['FullWidth', 'MinContent']).optional(),
      'padding': z.number().int().gte(0).describe('Dock/Taskbar padding in px').default(8),
      'pinnedItemsVisibility': z.enum(['Always', 'WhenPrimary']).optional(),
      'position': z.enum(['Left', 'Right', 'Top', 'Bottom']).optional(),
      'showEndTask': z.boolean().describe('show end task button on context menu (needs developer mode enabled)')
        .default(false),
      'showInstanceCounter': z.boolean().describe('enable or disable the instance counter visibility on weg instance')
        .default(true),
      'showWindowTitle': z.boolean().describe('enable or disable the window title visibility for opened apps').default(
        false,
      ),
      'size': z.number().int().gte(0).describe('item size in px').default(40),
      'spaceBetweenItems': z.number().int().gte(0).describe('space between items in px').default(8),
      'temporalItemsVisibility': z.enum(['All', 'OnMonitor']).optional(),
      'thumbnailGenerationEnabled': z.boolean().describe(
        'Decides whether the application hoover should generate thumbnails or just list the names instead',
      ).default(true),
      'visibleSeparators': z.boolean().describe('enable or disable separators visibility').default(true),
      'zoomSize': z.number().int().gte(0).describe('zoomed item size in px').default(70),
    }).optional(),
    '@seelen/window-manager': z.object({
      'autoStackingByCategory': z.boolean().describe('enable or disable auto stacking by category').default(true),
      'border': z.object({
        'enabled': z.boolean().default(true),
        'offset': z.number().default(0),
        'width': z.number().default(3),
      }).optional(),
      'defaultLayout': z.string().describe(
        'Visual id composed of the creator username and the resource name. e.g. `@username/resource-name`',
      ).optional(),
      'enabled': z.boolean().describe('enable or disable the window manager').default(false),
      'floating': z.object({ 'height': z.number().default(500), 'width': z.number().default(800) }).optional(),
      'resizeDelta': z.number().describe('the resize size in % to be used when resizing via cli').default(10),
      'workspaceGap': z.number().int().gte(0).describe('default gap between containers').default(10),
      'workspaceMargin': z.object({
        'bottom': z.number().int(),
        'left': z.number().int(),
        'right': z.number().int(),
        'top': z.number().int(),
      }).optional(),
      'workspacePadding': z.number().int().gte(0).describe('default workspace padding').default(10),
    }).optional(),
  }).and(z.record(
    z.object({
      '$instances': z.union([
        z.record(z.record(z.any())).describe(
          'By intance will be used to store settings in case of multiple instances allowed on widget.\\\n The map values will be merged with the root object and default values on settings declaration.',
        ),
        z.null().describe(
          'By intance will be used to store settings in case of multiple instances allowed on widget.\\\n The map values will be merged with the root object and default values on settings declaration.',
        ),
      ]).describe(
        'By intance will be used to store settings in case of multiple instances allowed on widget.\\\n The map values will be merged with the root object and default values on settings declaration.',
      ).optional(),
      'enabled': z.boolean().describe('Enable or disable the widget').default(true),
    }).and(z.record(z.any())).describe('This struct is intented to work with ts-rs flattening'),
  )).describe('This struct is intented to work with ts-rs flattening').optional(),
  'dateFormat': z.string().describe('MomentJS date format').default('ddd D MMM, hh:mm A'),
  'devTools': z.boolean().describe('enable or disable dev tools tab in settings').default(false),
  'drpc': z.boolean().describe('discord rich presence').default(true),
  'fancyToolbar': z.union([
    z.object({
      'delayToHide': z.number().int().gte(0).describe('delay to hide the toolbar on Mouse Leave in milliseconds')
        .default(800),
      'delayToShow': z.number().int().gte(0).describe('delay to show the toolbar on Mouse Hover in milliseconds')
        .default(100),
      'dynamicColor': z.boolean().describe(
        'enable or disable dynamic color based on maximized focused window (themes can override this)',
      ).default(true),
      'enabled': z.boolean().describe('enable or disable the fancy toolbar').default(true),
      'height': z.number().int().gte(0).describe('height of the fancy toolbar').default(30),
      'hideMode': z.any().superRefine((x, ctx) => {
        const schemas = [
          z.literal('Never').describe('never hide'),
          z.literal('Always').describe('auto-hide always on'),
          z.literal('OnOverlap').describe('auto-hide only if is overlaped by the focused window'),
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
      'position': z.enum(['Top', 'Bottom']).optional(),
      'showHibernateButton': z.boolean().describe('show the hibernate button on power menu').default(false),
    }),
    z.null(),
  ]).describe('@deprecated since v2.1.0, will be removed in v3.0.0').optional(),
  'iconPacks': z.array(z.string()).describe('list of selected icon packs').default(['system']),
  'language': z.union([
    z.string().describe('language to use, if null the system locale is used'),
    z.null().describe('language to use, if null the system locale is used'),
  ]).describe('language to use, if null the system locale is used').default('en'),
  'launcher': z.union([
    z.object({
      'enabled': z.boolean().default(false),
      'monitor': z.enum(['Primary', 'MouseOver']).optional(),
      'runners': z.array(
        z.object({
          'id': z.string().default(''),
          'label': z.string().default(''),
          'program': z.string().default(''),
          'readonly': z.boolean().default(false),
        }),
      ).default([{
        'id': 'RUN',
        'label': 't:app_launcher.runners.explorer',
        'program': 'explorer.exe',
        'readonly': true,
      }, { 'id': 'CMD', 'label': 't:app_launcher.runners.cmd', 'program': 'cmd.exe', 'readonly': true }]),
    }),
    z.null(),
  ]).describe('@deprecated since v2.1.0, will be removed in v3.0.0').optional(),
  'monitorsV2': z.record(z.object({
    'byWidget': z.object({
      '@seelen/fancy-toolbar': z.object({ 'enabled': z.boolean().default(true) }),
      '@seelen/wallpaper-manager': z.object({
        'backgrounds': z.union([z.array(z.object({ 'id': z.string(), 'path': z.string() })), z.null()]).default(null),
        'enabled': z.boolean().default(true),
      }),
      '@seelen/weg': z.object({
        'enabled': z.boolean().default(true),
        'pinnedItemsVisibility': z.union([z.enum(['Always', 'WhenPrimary']), z.null()]).default(null),
        'temporalItemsVisibility': z.union([z.enum(['All', 'OnMonitor']), z.null()]).default(null),
      }),
      '@seelen/window-manager': z.object({
        'enabled': z.boolean().default(true),
        'gap': z.union([z.number().int().gte(0), z.null()]).default(null),
        'layout': z.union([z.string(), z.null()]).default(null),
        'margin': z.union([
          z.object({
            'bottom': z.number().int(),
            'left': z.number().int(),
            'right': z.number().int(),
            'top': z.number().int(),
          }),
          z.null(),
        ]).default(null),
        'padding': z.union([z.number().int().gte(0), z.null()]).default(null),
      }),
    }).and(z.record(
      z.object({
        '$instances': z.union([
          z.record(z.record(z.any())).describe(
            'By intance will be used to store settings in case of multiple instances allowed on widget.\\\n The map values will be merged with the root object and default values on settings declaration.',
          ),
          z.null().describe(
            'By intance will be used to store settings in case of multiple instances allowed on widget.\\\n The map values will be merged with the root object and default values on settings declaration.',
          ),
        ]).describe(
          'By intance will be used to store settings in case of multiple instances allowed on widget.\\\n The map values will be merged with the root object and default values on settings declaration.',
        ).optional(),
        'enabled': z.boolean().describe('Enable or disable the widget').default(true),
      }).and(z.record(z.any())).describe('This struct is intented to work with ts-rs flattening'),
    )).describe('This struct is intented to work with ts-rs flattening').optional(),
    'tb': z.union([z.object({ 'enabled': z.boolean().default(true) }), z.null()]).describe(
      '@deprecated since v2.1.0, will be removed in v3.0.0',
    ).optional(),
    'wall': z.union([
      z.object({
        'backgrounds': z.union([z.array(z.object({ 'id': z.string(), 'path': z.string() })), z.null()]).default(null),
        'enabled': z.boolean().default(true),
      }),
      z.null(),
    ]).describe('@deprecated since v2.1.0, will be removed in v3.0.0').optional(),
    'weg': z.union([
      z.object({
        'enabled': z.boolean().default(true),
        'pinnedItemsVisibility': z.union([z.enum(['Always', 'WhenPrimary']), z.null()]).default(null),
        'temporalItemsVisibility': z.union([z.enum(['All', 'OnMonitor']), z.null()]).default(null),
      }),
      z.null(),
    ]).describe('@deprecated since v2.1.0, will be removed in v3.0.0').optional(),
    'wm': z.union([
      z.object({
        'enabled': z.boolean().default(true),
        'gap': z.union([z.number().int().gte(0), z.null()]).default(null),
        'layout': z.union([z.string(), z.null()]).default(null),
        'margin': z.union([
          z.object({
            'bottom': z.number().int(),
            'left': z.number().int(),
            'right': z.number().int(),
            'top': z.number().int(),
          }),
          z.null(),
        ]).default(null),
        'padding': z.union([z.number().int().gte(0), z.null()]).default(null),
      }),
      z.null(),
    ]).describe('@deprecated since v2.1.0, will be removed in v3.0.0').optional(),
    'workspacesV2': z.array(
      z.object({
        'backgrounds': z.union([z.array(z.object({ 'id': z.string(), 'path': z.string() })), z.null()]).optional(),
        'identifier': z.object({ 'id': z.string(), 'kind': z.enum(['Name', 'Index']) }),
        'layout': z.union([z.string(), z.null()]).optional(),
      }),
    ).describe('list of settings by workspace on this monitor').default([]),
  })).describe('list of monitors and their configurations').default({}),
  'seelenweg': z.union([
    z.object({
      'delayToHide': z.number().int().gte(0).describe('delay to hide the toolbar on Mouse Leave in milliseconds')
        .default(800),
      'delayToShow': z.number().int().gte(0).describe('delay to show the toolbar on Mouse Hover in milliseconds')
        .default(100),
      'enabled': z.boolean().describe('enable or disable the seelenweg').default(true),
      'hideMode': z.any().superRefine((x, ctx) => {
        const schemas = [
          z.literal('Never').describe('never hide'),
          z.literal('Always').describe('auto-hide always on'),
          z.literal('OnOverlap').describe('auto-hide only if is overlaped by the focused window'),
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
      'margin': z.number().int().gte(0).describe('Dock/Taskbar margin in px').default(8),
      'mode': z.enum(['FullWidth', 'MinContent']).optional(),
      'padding': z.number().int().gte(0).describe('Dock/Taskbar padding in px').default(8),
      'pinnedItemsVisibility': z.enum(['Always', 'WhenPrimary']).optional(),
      'position': z.enum(['Left', 'Right', 'Top', 'Bottom']).optional(),
      'showEndTask': z.boolean().describe('show end task button on context menu (needs developer mode enabled)')
        .default(false),
      'showInstanceCounter': z.boolean().describe('enable or disable the instance counter visibility on weg instance')
        .default(true),
      'showWindowTitle': z.boolean().describe('enable or disable the window title visibility for opened apps').default(
        false,
      ),
      'size': z.number().int().gte(0).describe('item size in px').default(40),
      'spaceBetweenItems': z.number().int().gte(0).describe('space between items in px').default(8),
      'temporalItemsVisibility': z.enum(['All', 'OnMonitor']).optional(),
      'thumbnailGenerationEnabled': z.boolean().describe(
        'Decides whether the application hoover should generate thumbnails or just list the names instead',
      ).default(true),
      'visibleSeparators': z.boolean().describe('enable or disable separators visibility').default(true),
      'zoomSize': z.number().int().gte(0).describe('zoomed item size in px').default(70),
    }),
    z.null(),
  ]).describe('@deprecated since v2.1.0, will be removed in v3.0.0').optional(),
  'selectedThemes': z.array(z.string()).describe('list of selected themes').default(['default']),
  'updater': z.object({ 'channel': z.enum(['Release', 'Beta', 'Nightly']) }).optional(),
  'virtualDesktopStrategy': z.enum(['Native', 'Seelen']).optional(),
  'wall': z.union([
    z.object({
      'backgrounds': z.array(z.object({ 'id': z.string(), 'path': z.string() })).default([]),
      'enabled': z.boolean().default(true),
      'interval': z.number().int().gte(0).describe('update interval in seconds').default(60),
      'randomize': z.boolean().default(false),
    }),
    z.null(),
  ]).describe('@deprecated since v2.1.0, will be removed in v3.0.0').optional(),
  'windowManager': z.union([
    z.object({
      'autoStackingByCategory': z.boolean().describe('enable or disable auto stacking by category').default(true),
      'border': z.object({
        'enabled': z.boolean().default(true),
        'offset': z.number().default(0),
        'width': z.number().default(3),
      }).optional(),
      'defaultLayout': z.string().describe(
        'Visual id composed of the creator username and the resource name. e.g. `@username/resource-name`',
      ).optional(),
      'enabled': z.boolean().describe('enable or disable the window manager').default(false),
      'floating': z.object({ 'height': z.number().default(500), 'width': z.number().default(800) }).optional(),
      'resizeDelta': z.number().describe('the resize size in % to be used when resizing via cli').default(10),
      'workspaceGap': z.number().int().gte(0).describe('default gap between containers').default(10),
      'workspaceMargin': z.object({
        'bottom': z.number().int(),
        'left': z.number().int(),
        'right': z.number().int(),
        'top': z.number().int(),
      }).optional(),
      'workspacePadding': z.number().int().gte(0).describe('default workspace padding').default(10),
    }),
    z.null(),
  ]).describe('@deprecated since v2.1.0, will be removed in v3.0.0').optional(),
});
