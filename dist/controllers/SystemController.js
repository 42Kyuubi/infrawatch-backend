"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const systemSchema_1 = require("../schemas/systemSchema");
const SystemService_1 = __importDefault(require("../services/SystemService"));
class SystemController {
    async create(req, res) {
        const parsed = systemSchema_1.SystemSchema.safeParse(req.body);
        if (!parsed.success) {
            const errors = parsed.error.format();
            return res.status(400).json({ errors });
        }
        const data = {
            ...parsed.data,
            owner_user_id: req.user?.id || ""
        };
        console.log(data);
        try {
            const system = await SystemService_1.default.create(data);
            return res.status(201).json({
                message: 'sistema cadastrado com sucesso.',
                system: system,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async getAll(req, res) {
        try {
            const employees = await SystemService_1.default.getAll();
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
            const employee = await SystemService_1.default.getById(String(id));
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
            await SystemService_1.default.delete(String(id));
            return res.status(200).json({ message: 'User deletado com sucesso.' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedUser = await SystemService_1.default.updatePartial(String(id), updates);
            return res.status(200).json({
                message: 'User atualizado com sucesso.',
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