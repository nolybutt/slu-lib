"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileList = void 0;
const index_js_1 = require("../handlers/index.js");
class ProfileList {
    inner;
    constructor(inner) {
        this.inner = inner;
    }
    static async getAsync() {
        return new ProfileList(await (0, index_js_1.invoke)(index_js_1.SeelenCommand.stateGetProfiles));
    }
    toArray() {
        return this.inner;
    }
}
exports.ProfileList = ProfileList;
