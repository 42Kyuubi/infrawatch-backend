"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snmpCheck = snmpCheck;
const net_snmp_1 = __importDefault(require("net-snmp"));
async function snmpCheck(host, oid) {
    return new Promise((resolve) => {
        const session = net_snmp_1.default.createSession(host, "public", { timeout: 2000 });
        session.get([oid], (error, varbinds) => {
            if (error) {
                resolve({ status: 'ERROR', data: null });
            }
            else {
                resolve({ status: 'UP', data: varbinds[0]?.value || null });
            }
            session.close();
        });
    });
}
//# sourceMappingURL=snmpCheck.js.map