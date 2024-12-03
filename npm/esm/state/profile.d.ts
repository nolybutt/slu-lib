import { Placeholder } from './placeholder.js';
export interface ProfileSettings {
    themes: string[];
}
export interface Profile {
    name: string;
    toolbarLayour: Placeholder;
    settings: ProfileSettings;
}
export declare class ProfileList {
    private inner;
    private constructor();
    static getAsync(): Promise<ProfileList>;
    toArray(): Profile[];
}
//# sourceMappingURL=profile.d.ts.map