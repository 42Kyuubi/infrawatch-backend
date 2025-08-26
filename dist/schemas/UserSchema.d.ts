import { z } from 'zod';
export declare const userSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        operator: "operator";
        viewer: "viewer";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=UserSchema.d.ts.map