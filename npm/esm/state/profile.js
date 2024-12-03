import { invoke, SeelenCommand } from '../handlers/index.js';
export class ProfileList {
    inner;
    constructor(inner) {
        this.inner = inner;
    }
    static async getAsync() {
        return new ProfileList(await invoke(SeelenCommand.stateGetProfiles));
    }
    toArray() {
        return this.inner;
    }
}
