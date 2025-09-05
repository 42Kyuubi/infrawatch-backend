"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Nome é obrigatório"),
    email: zod_1.z.string().email("E-mail inválido"),
    password: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: zod_1.z.enum(["admin", "operator", "viewer"], "Cargo inválido"),
});
//# sourceMappingURL=UserSchema.js.map