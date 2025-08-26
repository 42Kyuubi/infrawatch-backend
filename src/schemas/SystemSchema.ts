import { z } from "zod";

const ConnectionType = z.enum(["api", "snmp", "ping", "webhook"]);
const Status = z.enum(["up", "maintenance" ,"down"]);


export const SystemSchema = z.object({
  name: z.string().min(1, "name cannot be empty"),
  id_type: z.string().min(1, "type cannot be empty"),
  target: z.string().min(1, "target cannot be empty"),
  connection_type: ConnectionType, 
  status: Status,
  criticality_level: z
    .number()
    .int()
    .min(1, "criticality_level must be between 1 and 5")
    .max(5, "criticality_level must be between 1 and 5"),
  sla_target: z
    .number()
    .min(0, "sla_target must be >= 0")
    .max(100, "sla_target must be <= 100"),
  check_interval: z
    .number()
    .refine((n) => Number.isInteger(n) && n > 0, {
      message: "check_interval must be a positive integer (seconds)",
    }),
});

export const typeSystemSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório")
});
