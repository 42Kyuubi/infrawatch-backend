"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SystemSchema_1 = require("../schemas/SystemSchema");
const TypeSystemService_1 = __importDefault(require("../services/TypeSystemService"));
const LogService_1 = __importDefault(require("../services/LogService"));
class TypeSystemController {
    async create(req, res) {
        const parsed = SystemSchema_1.typeSystemSchema.safeParse(req.body);
        if (!parsed.success) {
            const errors = parsed.error.format();
            return res.status(400).json({ errors });
        }
        const data = {
            ...parsed.data,
            company_id: req.user?.company_id || ""
        };
        try {
            const typesystem = await TypeSystemService_1.default.create(data);
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "create",
                description: { typesystem },
                company_id: req.user?.company_id
            });
            return res.status(201).json({
                message: 'Tipo de sistema cadastrado com sucesso.',
                type_system: typesystem,
            });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async getAll(req, res) {
        try {
            const typesystems = await TypeSystemService_1.default.getAll();
            return res.status(200).json({
                message: 'Lista de Tipos de Sistemas.',
                data: typesystems,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const typesystem = await TypeSystemService_1.default.getById(String(id));
            return res.status(200).json({
                message: 'Tipo de Sistema.',
                data: typesystem,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await TypeSystemService_1.default.delete(String(id));
            return res.status(200).json({ message: 'Tipo de sistema deletado com sucesso.' });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updated = await TypeSystemService_1.default.updatePartial(String(id), updates);
            return res.status(200).json({
                message: 'Tipo de Sistema atualizado com sucesso.',
                data: updated,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
exports.default = new TypeSystemController();
//# sourceMappingURL=TypeSystemController.js.map