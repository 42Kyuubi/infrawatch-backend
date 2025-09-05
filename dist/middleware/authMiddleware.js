"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const connect_1 = __importDefault(require("../infra/supabase/connect"));
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return handleUnauthorized(req, res, "Token não fornecido.");
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await connect_1.default.auth.getUser(token);
    if (error || !user) {
        return handleUnauthorized(req, res, "Token inválido ou expirado.");
    }
    const { data: company_id } = await connect_1.default
        .from("users")
        .select('company_id')
        .eq('id', user?.id)
        .single();
    req.user = { ...user, ...company_id };
    next();
}
function handleUnauthorized(req, res, message) {
    if (req.headers.accept?.includes("text/event-stream")) {
        res.setHeader("Content-Type", "text/event-stream");
        res.write(`event: error\ndata: ${JSON.stringify({ error: message })}\n\n`);
        return res.end();
    }
    return res.status(401).json({ error: message });
}
//# sourceMappingURL=authMiddleware.js.map