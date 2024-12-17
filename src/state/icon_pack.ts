import { ResourceMetadata } from './mod.ts';

export class IconPack {
  info: ResourceMetadata = new ResourceMetadata();
  apps: Record<string, string> = {};
}
