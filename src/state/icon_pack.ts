import { ResourceMetadata } from './index.ts';

export class IconPack {
  info: ResourceMetadata = new ResourceMetadata();
  apps: Record<string, string> = {};
}
