import { z } from "zod";
export declare const SystemSchema: z.ZodObject<{
    name: z.ZodString;
    id_type: z.ZodString;
    target: z.ZodString;
    connection_type: z.ZodEnum<{
        api: "api";
        snmp: "snmp";
        ping: "ping";
        webhook: "webhook";
    }>;
    status: z.ZodEnum<{
        up: "up";
        maintenance: "maintenance";
        down: "down";
    }>;
    criticality_level: z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
        critical: "critical";
    }>;
    sla_target: z.ZodNumber;
    check_interval: z.ZodNumber;
    lat: z.ZodNumber;
    lng: z.ZodNumber;
}, z.core.$strip>;
export declare const typeSystemSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=SystemSchema.d.ts.map