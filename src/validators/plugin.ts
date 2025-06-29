import { z } from 'zod';

export default z.object({
  'icon': z.string().describe(
    'Optional icon to be used on settings. This have to be a valid react icon name.\\\n You can find all icons here: https://react-icons.github.io/react-icons/.',
  ).default('PiPuzzlePieceDuotone'),
  'id': z.string().describe(
    'Visual id composed of the creator username and the resource name. e.g. `@username/resource-name`',
  ),
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
}).and(z.union([
  z.any().superRefine((x, ctx) => {
    const schemas = [
      z.object({
        'plugin': z.any().superRefine((x, ctx) => {
          const schemas = [
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Base Item Scope\n Have all icons defined on [React Icons](https://react-icons.github.io/react-icons) as properties of the object.\n ```js\n const icon: object;\n ```\n Haves all environment variables defined on the system as properties of the object.\n ```js\n const env: object;\n ```\n Functions to add images to the item.\n ```js\n function getIcon(name: string, size: number = 16): string\n function imgFromUrl (url: string, size: number = 16): string\n function imgFromPath (path: string, size: number = 16): string\n function imgFromExe (exe_path: string, size: number = 16): string\n function t(path: string): string\n ```',
              ).default(null),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Generic Item Scope\n ```ts\n // the current focused window\n const window: {\n     name: string;\n     title: string;\n     exe: string | null;\n };\n ```',
              ).default(null),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Date Item Scope\n ```ts\n const date: string; // the formatted date\n ```',
              ).default(null),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  "Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
                ),
                z.null().describe(
                  "Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
                ),
              ]).describe(
                "Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  "This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
                ),
                z.null().describe(
                  "This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
                ),
              ]).describe(
                "This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                "Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  "Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
                ),
                z.null().describe(
                  "Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
                ),
              ]).describe(
                "Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Power Item Scope\n ```ts\n interface PowerStatus {\n     acLineStatus: number;\n     batteryFlag: number;\n     batteryLifePercent: number;\n     systemStatusFlag: number;\n     batteryLifeTime: number;\n     batteryFullLifeTime: number;\n }\n\n enum PowerPlan {\n   Balanced = 'Balanced',\n   BatterySaver = 'BatterySaver',\n   BetterBattery = 'BetterBattery',\n   GameMode = 'GameMode',\n   HighPerformance = 'HighPerformance',\n   MaxPerformance = 'MaxPerformance',\n   MixedReality = 'MixedReality',\n }\n\n interface Battery {\n     // Static info\n     vendor: string | null;\n     model: string | null;\n     serialNumber: string | null;\n     technology: string;\n\n     // Common information\n     state: string;\n     capacity: number;\n     temperature: number | null;\n     percentage: number;\n     cycleCount: number | null;\n     smartCharging: boolean;\n\n     // Energy stats\n     energy: number;\n     energyFull: number;\n     energyFullDesign: number;\n     energyRate: number;\n     voltage: number;\n\n     // Charge stats\n     timeToFull: number | null;\n     timeToEmpty: number | null;\n }\n\n const power: PowerStatus;\n const powerPlan: PowerPlan;\n const batteries: Battery[];\n const battery: Battery | null;\n ```",
              ).default(null),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Keyboard Item Scope\n ```ts\n interface KeyboardLayout {\n   id: string;\n   handle: string;\n   displayName: string;\n   active: boolean;\n }\n\n interface SystemLanguage {\n   id: string;\n   code: string;\n   name: string;\n   nativeName: string;\n   inputMethods: KeyboardLayout[];\n }\n\n const languages: Language[];\n const activeLang: Language;\n const activeKeyboard: KeyboardLayout;\n const activeLangPrefix: string;\n const activeKeyboardPrefix: string;\n ```',
              ).default(null),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  "Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
                ),
                z.null().describe(
                  "Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
                ),
              ]).describe(
                "Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  "This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
                ),
                z.null().describe(
                  "This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
                ),
              ]).describe(
                "This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                "Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  "Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
                ),
                z.null().describe(
                  "Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
                ),
              ]).describe(
                "Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Network Item Scope\n ```ts\n interface NetworkInterface {\n     name: string;\n     description: string;\n     status: 'up' | 'down';\n     dnsSuffix: string;\n     type: string;\n     gateway: string | null;\n     mac: string;\n     ipv4: string | null;\n     ipv6: string | null;\n }\n const online: boolean;\n const interfaces: NetworkInterface[];\n const usingInterface: NetworkInterface | null;\n ```",
              ).default(null),
              'withWlanSelector': z.boolean().describe('Show Wi-fi selector popup on click]').default(false),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Bluetooth Item Scope\n ```ts\n interface BluetoothDevice\n {\n     id: string,\n     name: string,\n     address: bigint,\n     majorClass: BluetoothMajor,\n     minorMainClass: BluetoothMinor,\n     minorSubClass: BluetoothMinor,\n     connected: boolean,\n     paired: boolean,\n     canPair: boolean,\n     isBluetoothLoweenergy: boolean,\n     iconPath: string,\n }\n\n type BluetoothMajor = "Miscellaneous" | "Computer" | "Phone" | "NetworkAccessPoint" | "AudioVideo" | "Peripheral" | "Imaging" | "Wearable" | "Toy" | "Health" | "Unkown";\n\n type BluetoothMinor = "Uncategorized" | "ComputerDesktop" | "ComputerServer" | "ComputerLaptop" | "ComputerHandheld" | "ComputerPalmSize" | "ComputerWearable" | "ComputerTablet"\n     | "PhoneCellular" | "PhoneCordless" | "PhoneSmartPhone" | "PhoneWired" | "PhoneIsdn" | "NetworkFullyAvailable" | "NetworkUsed01To17Percent" | "NetworkUsed17To33Percent" | "NetworkUsed33To50Percent"\n     | "NetworkUsed50To67Percent" | "NetworkUsed67To83Percent" | "NetworkUsed83To99Percent" | "NetworkNoServiceAvailable" | "AudioVideoWearableHeadset" | "AudioVideoHandsFree" | "AudioVideoMicrophone"\n     | "AudioVideoLoudspeaker" | "AudioVideoHeadphones" | "AudioVideoPortableAudio" | "AudioVideoCarAudio" | "AudioVideoSetTopBox" | "AudioVideoHifiAudioDevice" | "AudioVideoVcr" | "AudioVideoVideoCamera"\n     | "AudioVideoCamcorder" | "AudioVideoVideoMonitor" | "AudioVideoVideoDisplayAndLoudspeaker" | "AudioVideoVideoConferencing" | "AudioVideoGamingOrToy" | "PeripheralJoystick" | "PeripheralGamepad"\n     | "PeripheralRemoteControl" | "PeripheralSensing" | "PeripheralDigitizerTablet" | "PeripheralCardReader" | "PeripheralDigitalPen" | "PeripheralHandheldScanner" | "PeripheralHandheldGesture"\n     | "WearableWristwatch" | "WearablePager" | "WearableJacket" | "WearableHelmet" | "WearableGlasses" | "ToyRobot" | "ToyVehicle" | "ToyDoll" | "ToyController" | "ToyGame" | "HealthBloodPressureMonitor"\n     | "HealthThermometer" | "HealthWeighingScale" | "HealthGlucoseMeter" | "HealthPulseOximeter" | "HealthHeartRateMonitor" | "HealthHealthDataDisplay" | "HealthStepCounter" | "HealthBodyCompositionAnalyzer"\n     | "HealthPeakFlowMonitor" | "HealthMedicationMonitor" | "HealthKneeProsthesis" | "HealthAnkleProsthesis" | "HealthGenericHealthManager" | "HealthPersonalMobilityDevice" | "PeripheralOther" | "PeripheralPointer"\n     | "PeripheralKeyboard" | "PeripheralKeyboardAndPointer";\n\n const bluetoothState: boolean;\n const devices: BluetoothDevice[];\n const connectedDevices: BluetoothDevice[];\n ```',
              ).default(null),
              'withBluetoothSelector': z.boolean().describe('Show bluetooth selector popup on click]').default(false),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Media Item Scope\n ```ts\n const volume: number; // output master volume from 0 to 1\n const isMuted: boolean; // output master volume is muted\n const inputVolume: number; // input master volume from 0 to 1\n const inputIsMuted: boolean; // input master volume is muted\n\n interface MediaSession {\n     id: string;\n     title: string;\n     author: string;\n     thumbnail: string | null; // path to temporal media session image\n     playing: boolean;\n     default: boolean;\n     owner: {\n         name: string;\n         iconPath: string | null;\n     } | null;\n }\n\n const mediaSession: MediaSession | null;\n ```',
              ).default(null),
              'withMediaControls': z.boolean().describe('Show media controls popup on click').default(false),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
              ).default(null),
              'withUserFolder': z.boolean().describe('Show user control popup on click').default(false),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Notifications Item Scope\n ```ts\n const count: number;\n ```',
              ).default(null),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
              ).default(null),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Device Item Scope\n this module does no expand the scope of the item',
              ).default(null),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Settings Item Scope\n this module does no expand the scope of the item',
              ).default(null),
            }),
            z.object({
              'badge': z.union([
                z.string().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'Badge will be displayed over the item, useful as notifications.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
              ).default(null),
              'id': z.string().describe('Id to identify the item, should be unique.').default(''),
              'mode': z.enum(['dotted', 'named', 'numbered']).optional(),
              'onClick': z.union([
                z.string().describe('Deprecated use `onClickV2` instead.'),
                z.null().describe('Deprecated use `onClickV2` instead.'),
              ]).describe('Deprecated use `onClickV2` instead.').default(null),
              'onClickV2': z.union([
                z.string().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'This code will be parsed and executed when the item is clicked.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
              ).default(null),
              'remoteData': z.record(
                z.object({
                  'requestInit': z.union([z.any(), z.null()]).optional(),
                  'updateIntervalSeconds': z.union([z.number().int().gte(0), z.null()]).optional(),
                  'url': z.string().url(),
                }),
              ).describe('Remote data to be added to the item scope.').default({}),
              'style': z.record(z.union([z.union([z.string(), z.number()]), z.null()])).describe(
                "Styles to be added to the item. This follow the same interface of React's `style` prop.",
              ).default({}),
              'template': z.string().describe(
                'Content to display in the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
              ).default(''),
              'tooltip': z.union([
                z.string().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
                z.null().describe(
                  'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
                ),
              ]).describe(
                'Content to display in tooltip of the item.\n\n Should follow the [mathjs expression syntax](https://mathjs.org/docs/expressions/syntax.html).\n\n ## Workspace Item Scope\n this module does no expand the scope of the item',
              ).default(null),
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
        'target': z.literal('@seelen/fancy-toolbar'),
      }),
      z.object({
        'plugin': z.object({
          'noFallbackBehavior': z.enum(['Float', 'Unmanaged']).optional(),
          'structure': z.any().superRefine((x, ctx) => {
            const schemas = [
              z.object({ 'type': z.literal('Vertical') }),
              z.object({ 'type': z.literal('Horizontal') }),
              z.object({
                'condition': z.union([
                  z.string().describe('Math Condition for the node to be shown, e.g: n >= 3'),
                  z.null().describe('Math Condition for the node to be shown, e.g: n >= 3'),
                ]).describe('Math Condition for the node to be shown, e.g: n >= 3').optional(),
                'growFactor': z.number().describe('How much of the remaining space this node will take').default(1),
                'handle': z.union([
                  z.number().int().describe('window handle (HWND) in the node'),
                  z.null().describe('window handle (HWND) in the node'),
                ]).describe('window handle (HWND) in the node').optional(),
                'priority': z.number().int().gte(0).describe(
                  'Order in how the tree will be traversed (1 = first, 2 = second, etc.)',
                ).default(1),
                'subtype': z.enum(['Temporal', 'Permanent']).optional(),
              }),
              z.object({
                'condition': z.union([
                  z.string().describe('Math Condition for the node to be shown, e.g: n >= 3'),
                  z.null().describe('Math Condition for the node to be shown, e.g: n >= 3'),
                ]).describe('Math Condition for the node to be shown, e.g: n >= 3').optional(),
                'growFactor': z.number().describe('How much of the remaining space this node will take').default(1),
                'priority': z.number().int().gte(0).describe(
                  'Order in how the tree will be traversed (1 = first, 2 = second, etc.)',
                ).default(1),
                'subtype': z.enum(['Temporal', 'Permanent']).optional(),
              }),
              z.object({
                'condition': z.union([
                  z.string().describe('Math Condition for the node to be shown, e.g: n >= 3'),
                  z.null().describe('Math Condition for the node to be shown, e.g: n >= 3'),
                ]).describe('Math Condition for the node to be shown, e.g: n >= 3').optional(),
                'growFactor': z.number().describe('How much of the remaining space this node will take').default(1),
                'priority': z.number().int().gte(0).describe(
                  'Order in how the tree will be traversed (1 = first, 2 = second, etc.)',
                ).default(1),
                'subtype': z.enum(['Temporal', 'Permanent']).optional(),
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
          }).optional(),
        }),
        'target': z.literal('@seelen/window-manager'),
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
  z.object({
    'plugin': z.any(),
    'target': z.string().describe(
      'Visual id composed of the creator username and the resource name. e.g. `@username/resource-name`',
    ),
  }),
]));
