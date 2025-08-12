import { z } from "zod";
export declare const SystemSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<{
        server: "server";
        network: "network";
        app: "app";
    }>;
    connection_type: z.ZodEnum<{
        api: "api";
        snmp: "snmp";
        ping: "ping";
        webhook: "webhook";
    }>;
    status: z.ZodEnum<{
        up: "up";
        down: "down";
    }>;
    criticality_level: z.ZodNumber;
    sla_target: z.ZodNumber;
    check_interval: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=SystemSchema.d.ts.map