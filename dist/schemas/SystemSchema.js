"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeSystemSchema = exports.SystemSchema = void 0;
const zod_1 = require("zod");
const ConnectionType = zod_1.z.enum(["api", "snmp", "ping", "webhook"]);
const Status = zod_1.z.enum(["up", "maintenance", "down"]);
const levels = zod_1.z.enum(["low", "medium", "high", "critical"]);
exports.SystemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "name cannot be empty"),
    id_type: zod_1.z.string().min(1, "type cannot be empty"),
    target: zod_1.z.string().min(1, "target cannot be empty"),
    connection_type: ConnectionType,
    status: Status,
    criticality_level: levels,
    sla_target: zod_1.z
        .number()
        .min(0, "sla_target must be >= 0")
        .max(100, "sla_target must be <= 100"),
    check_interval: zod_1.z
        .number()
        .refine((n) => Number.isInteger(n) && n > 0, {
        message: "check_interval must be a positive integer (seconds)",
    }),
    lat: zod_1.z.number(),
    lng: zod_1.z.number()
});
exports.typeSystemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório")
});
//# sourceMappingURL=SystemSchema.js.map