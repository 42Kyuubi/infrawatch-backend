"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCheck = PingCheck;
const ping_1 = __importDefault(require("ping"));
async function PingCheck(host) {
    try {
        const res = await ping_1.default.promise.probe(host);
        return {
            status: res.alive ? 'UP' : 'DOWN',
            time: res.time ? Number(res.time) : null,
        };
    }
    catch (err) {
        return { status: 'ERROR', time: null };
    }
}
//# sourceMappingURL=pingCheck.js.map