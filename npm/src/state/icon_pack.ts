import { ResourceMetadata } from './index.js';

export class IconPack {
  info: ResourceMetadata = new ResourceMetadata();
  apps: Record<string, string> = {};
}
