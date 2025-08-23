import { z } from "zod";
export declare const signInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type signInSchema = z.infer<typeof signInSchema>;
//# sourceMappingURL=CompanySchema.d.ts.map