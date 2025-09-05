"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogService_1 = __importDefault(require("../services/LogService"));
const IntegrationService_1 = __importDefault(require("../services/IntegrationService"));
const CompanyService_1 = __importDefault(require("../services/CompanyService"));
class IntegrationController {
    async create(req, res) {
        const parsed = (req.body);
        const data = {
            token: parsed.agent_token,
            type: parsed.id_type === '1' ? "AGENT" : "GPLI",
            APP_TOKEN: parsed.api_token,
            API_URL: parsed.api_url,
            AUTH_TOKEN: parsed.auth_token,
            status: 'inative',
        };
        try {
            const Integration = await IntegrationService_1.default.create(data);
            if (Integration.type === 'GLPI') {
                await CompanyService_1.default.updatePartial(String(req.user?.company_id), { glpi: true });
            }
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "create",
                description: Integration,
                company_id: req.user?.company_id
            });
            return res.status(201).json({
                message: 'Integration cadastrado com sucesso.',
                system: Integration,
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
            const Integration = await IntegrationService_1.default.getAll();
            return res.status(200).json({
                message: 'Lista de Integration.',
                data: Integration,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const Integration = await IntegrationService_1.default.getById(String(id));
            return res.status(200).json({
                message: 'Integration.',
                data: Integration,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await IntegrationService_1.default.delete(String(id));
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "delete",
                description: { Integration: id },
                company_id: req.user?.company_id
            });
            return res.status(200).json({ message: 'Integration deletado com sucesso.' });
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
exports.default = new IntegrationController();
//# sourceMappingURL=IntegrationController.js.map