"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeSystemSchema = exports.SystemSchema = void 0;
const zod_1 = require("zod");
const ConnectionType = zod_1.z.enum(["api", "snmp", "ping", "webhook"]);
const Status = zod_1.z.enum(["up", "maintenance", "down"]);
const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
exports.SystemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "name cannot be empty"),
    id_type: zod_1.z.string().min(1, "type cannot be empty"),
    target: zod_1.z.string().min(1, "target cannot be empty")
        .refine(val => ipRegex.test(val) || urlRegex.test(val), {
        message: "target must be a valid IP or URL"
    }),
    connection_type: ConnectionType,
    status: Status,
    criticality_level: zod_1.z
        .number()
        .int()
        .min(1, "criticality_level must be between 1 and 5")
        .max(5, "criticality_level must be between 1 and 5"),
    sla_target: zod_1.z
        .number()
        .min(0, "sla_target must be >= 0")
        .max(100, "sla_target must be <= 100"),
    check_interval: zod_1.z
        .number()
        .refine((n) => Number.isInteger(n) && n > 0, {
        message: "check_interval must be a positive integer (seconds)",
    }),
});
exports.typeSystemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório")
});
//# sourceMappingURL=SystemSchema.js.map