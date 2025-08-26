"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const systemSchema_1 = require("../schemas/systemSchema");
const SystemService_1 = __importDefault(require("../services/SystemService"));
const LogService_1 = __importDefault(require("../services/LogService"));
class SystemController {
    async create(req, res) {
        const parsed = systemSchema_1.SystemSchema.safeParse(req.body);
        if (!parsed.success) {
            const errors = parsed.error.format();
            return res.status(400).json({ errors });
        }
        const data = {
            owner_user_id: req.user?.id,
            company_id: req.user?.company_id,
            ...parsed.data,
        };
        try {
            const system = await SystemService_1.default.create(data);
            new LogService_1.default({
                system_id: system.id,
                user_id: req.user?.id,
                event_type: "create",
                description: system,
                company_id: req.user?.company_id
            });
            return res.status(201).json({
                message: 'sistema cadastrado com sucesso.',
                system: system,
            });
        }
        catch (err) {
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "error",
                description: err.message,
                company_id: req.user?.company_id
            });
            return res.status(400).json({ error: err.message });
        }
    }
    async getAll(req, res) {
        try {
            const employees = await SystemService_1.default.getAll();
            return res.status(200).json({
                message: 'Lista de Sistemas.',
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
            const employee = await SystemService_1.default.getById(String(id));
            return res.status(200).json({
                message: 'Sistema.',
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
            await SystemService_1.default.delete(String(id));
            new LogService_1.default({
                system_id: id,
                user_id: req.user?.id,
                event_type: "delete",
                description: { system_id: id },
                company_id: req.user?.company_id
            });
            return res.status(200).json({ message: 'Sistema deletado com sucesso.' });
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
            const updatedUser = await SystemService_1.default.updatePartial(String(id), updates);
            new LogService_1.default({
                system_id: id,
                user_id: req.user?.id,
                event_type: "update",
                description: updatedUser,
                company_id: req.user?.company_id
            });
            return res.status(200).json({
                message: 'Sistema atualizado com sucesso.',
                data: updatedUser,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
exports.default = new SystemController();
//# sourceMappingURL=SystemController.js.map