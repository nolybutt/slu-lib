import type { ResourceKind, ResourceStatus } from '@seelen-ui/types';
import { enumFromUnion } from './utils/enums.ts';

const ResourceKind = enumFromUnion<ResourceKind>({
  IconPack: 'IconPack',
  Theme: 'Theme',
  Widget: 'Widget',
  Plugin: 'Plugin',
  Wallpaper: 'Wallpaper',
  SoundPack: 'SoundPack',
});

const ResourceStatus = enumFromUnion<ResourceStatus>({
  Draft: 'Draft',
  Reviewing: 'Reviewing',
  Rejected: 'Rejected',
  Published: 'Published',
  Deleted: 'Deleted',
});

export { ResourceKind, ResourceStatus };
