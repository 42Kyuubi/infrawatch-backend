"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionMiddleware = permissionMiddleware;
exports.permissionAdminMiddleware = permissionAdminMiddleware;
async function permissionMiddleware(req, res, next) {
    if (req.user?.role === "viewer") {
        return res.status(401).json({ message: 'Acesso Negado!  Não tens permissão' });
    }
    next();
}
async function permissionAdminMiddleware(req, res, next) {
    if (req.user?.role != "admin") {
        console.log(req.user);
        return res.status(401).json({ message: 'Acesso Negado!  Não tens permissão' });
    }
    next();
}
//# sourceMappingURL=permissionMiddleware.js.map