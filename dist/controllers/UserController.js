"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = require("../schemas/UserSchema");
const UserService_1 = __importDefault(require("../services/UserService"));
const LogService_1 = __importDefault(require("../services/LogService"));
class UserController {
    async create(req, res) {
        const parsed = UserSchema_1.userSchema.safeParse(req.body);
        if (!parsed.success) {
            const errors = parsed.error.format();
            return res.status(400).json({ errors });
        }
        const userData = {
            company_id: req.user?.company_id,
            ...parsed.data,
        };
        try {
            const user = await UserService_1.default.create(userData);
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "create",
                description: user,
                company_id: req.user?.company_id
            });
            return res.status(201).json({
                message: 'Usuario cadastrado com sucesso.',
                user: user,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async getAll(req, res) {
        try {
            const employees = await UserService_1.default.getAll();
            return res.status(200).json({
                message: 'Lista de User.',
                data: employees,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const employee = await UserService_1.default.getById(String(id));
            return res.status(200).json({
                message: 'User.',
                data: employee,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await UserService_1.default.delete(String(id));
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "delete",
                description: { user_id: id },
                company_id: req.user?.company_id
            });
            return res.status(200).json({ message: 'User deletado com sucesso.' });
        }
        catch (err) {
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "error",
                description: err.message,
                company_id: req.user?.company_id
            });
            return res.status(500).json({ error: err.message });
        }
    }
    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedUser = await UserService_1.default.updatePartial(String(id), updates);
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "update",
                description: updatedUser,
                company_id: req.user?.company_id
            });
            return res.status(200).json({
                message: 'User atualizado com sucesso.',
                data: updatedUser,
            });
        }
        catch (err) {
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "error",
                description: err.message,
                company_id: req.user?.company_id
            });
            return res.status(500).json({ error: err.message });
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map