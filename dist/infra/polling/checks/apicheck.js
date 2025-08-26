"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apicheck = Apicheck;
const axios_1 = __importDefault(require("axios"));
async function Apicheck(url) {
    const start = Date.now();
    try {
        const res = await axios_1.default.get(`https://${url}`, { timeout: 5000 });
        const duration = Date.now() - start;
        return {
            status: res.status >= 200 && res.status < 400 ? 'UP' : 'DOWN',
            time: duration,
            headers: res.headers
        };
    }
    catch {
        return { status: 'DOWN', time: null, headers: {} };
    }
}
//# sourceMappingURL=apicheck.js.map