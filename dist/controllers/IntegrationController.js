"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
;
const LogService_1 = __importDefault(require("../services/LogService"));
const IntegrationService_1 = __importDefault(require("../services/IntegrationService"));
const CompanyService_1 = __importDefault(require("../services/CompanyService"));
class IntegrationController {
    async validationAgent(req, res) {
        const parsed = req.body;
        const data = {
            token: parsed.token,
            region: parsed.region,
            cod_agent: parsed.urlServer,
            country: parsed.country,
            city: parsed.city,
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            date_time: parsed.date_time,
            status: "active",
        };
        try {
            const existingIntegration = await IntegrationService_1.default.findByToken(parsed.token);
            if (!existingIntegration) {
                new LogService_1.default({
                    user_id: req.user?.id,
                    event_type: "error",
                    description: `Token inválido: ${parsed.token}`,
                    company_id: req.user?.company_id
                });
                return res.status(400).json({
                    result: 'KO',
                    message: "Token inválido ou integração não encontrada."
                });
            }
            if (existingIntegration.status === "active") {
                new LogService_1.default({
                    user_id: req.user?.id,
                    event_type: "error",
                    description: `Token já ativo: ${parsed.token}`,
                    company_id: req.user?.company_id
                });
                return res.status(400).json({
                    result: 'KO',
                    message: "Token inválido ou já ativo."
                });
            }
            const integration = await IntegrationService_1.default.updatePartial(String(existingIntegration.id), data);
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "update",
                description: integration,
                company_id: req.user?.company_id
            });
            return res.status(200).json({
                message: "Integration ativada com sucesso.",
                result: 'OK',
                system: integration
            });
        }
        catch (err) {
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "error",
                description: err.message,
                company_id: req.user?.company_id
            });
            return res.status(400).json({ result: 'KO', error: "Token inválido ou integração não encontrada." });
        }
    }
    async create(req, res) {
        const parsed = (req.body);
        const data = {
            ...parsed,
            status: 'desative',
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
    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedIntegration = await IntegrationService_1.default.updatePartial(String(id), updates);
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "update",
                description: updatedIntegration,
                company_id: req.user?.company_id
            });
            return res.status(200).json({
                message: 'Integration atualizado com sucesso.',
                data: updatedIntegration,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
exports.default = new IntegrationController();
//# sourceMappingURL=IntegrationController.js.map