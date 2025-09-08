"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IntegrationService_1 = __importDefault(require("../services/IntegrationService"));
const LogService_1 = __importDefault(require("../services/LogService"));
const SystemService_1 = __importDefault(require("../services/SystemService"));
const AgentService_1 = __importDefault(require("../services/AgentService"));
const connect_1 = __importDefault(require("../infra/supabase/connect"));
class AgentController {
    async validationAgent(req, res) {
        const parsed = req.body;
        const data = {
            token: parsed.token,
            region: parsed.region,
            cod_agent: parsed.code_agent,
            country: parsed.country,
            city: parsed.city,
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            date_time: parsed.date_time || (new Date),
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
    async createAgentSystem(req, res) {
        const parsed = (req.body);
        const data = {
            id_system_aget: parsed.id,
            name: parsed.nome,
            id_type: parsed.idType,
            connection_type: parsed.conectionType,
            status: parsed.status,
            check_interval: parsed.checkInterval,
            created_at: parsed.dataTime,
            target: parsed.target,
            company_id: parsed.company_id,
            agent: parsed.idAgent,
            criticality_level: "critical",
            lat: parsed.lat,
            lng: parsed.lng
        };
        try {
            const Integration = await SystemService_1.default.create(data);
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "create",
                description: `Upload de sistemas do Agent ${Integration}`,
                company_id: req.user?.company_id
            });
            return res.status(201).json({
                message: 'Sistema do Agent cadastrado com sucesso.',
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
    async getSystemAllByAgent(req, res) {
        try {
            const { agent } = req.params;
            if (!agent)
                return res.status(500).json({ error: "Token Invalido!" });
            const integrations = await AgentService_1.default.getAllByAgent(agent);
            return res.status(200).json({
                message: `Lista de sistemas do agente ${agent}.`,
                data: integrations,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async createAgentMetrics(req, res) {
        const parsed = req.body;
        try {
            const { data: system, error: systemError } = await connect_1.default
                .from("systems")
                .select("id")
                .eq("id_system_aget", parsed.system_id)
                .single();
            if (systemError || !system) {
                return res.status(404).json({
                    message: `Nenhum sistema encontrado com id_system_aget = ${parsed.system_id}`,
                });
            }
            const data = {
                system_id: system.id,
                status: parsed.status,
                uptime_percent: parsed.uptime_percent,
                downtime_minutes: parsed.downtime_minutes,
                sla_percent: 98,
                value: parsed.value,
                last_check: parsed.lastCheck,
            };
            const { data: existingMetric, error: metricError } = await connect_1.default
                .from("metrics")
                .select("*")
                .eq("system_id", system.id)
                .single();
            let metrics;
            if (existingMetric) {
                const { data: updated, error: updateError } = await connect_1.default
                    .from("metrics")
                    .update(data)
                    .eq("system_id", system.id)
                    .select()
                    .single();
                if (updateError)
                    throw new Error(updateError.message);
                metrics = updated;
            }
            else {
                const { data: created, error: createError } = await connect_1.default
                    .from("metrics")
                    .insert(data)
                    .select()
                    .single();
                if (createError)
                    throw new Error(createError.message);
                metrics = created;
            }
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: existingMetric ? "update" : "create",
                description: `${existingMetric ? "Atualização" : "Upload"} de sistemas do Agent ${metrics.id}`,
                company_id: req.user?.company_id,
            });
            return res.status(existingMetric ? 200 : 201).json({
                message: `Sistema do Agent ${existingMetric ? "atualizado" : "cadastrado"} com sucesso.`,
                system: metrics,
            });
        }
        catch (err) {
            new LogService_1.default({
                user_id: req.user?.id,
                event_type: "error",
                description: err.message,
                company_id: req.user?.company_id,
            });
            return res.status(400).json({ error: err.message });
        }
    }
    async getMetricsAllByAgent(req, res) {
        try {
            const { agent } = req.params;
            if (!agent)
                return res.status(500).json({ error: "Token Invalido!" });
            const integrations = await AgentService_1.default.getAllByAgent(agent);
            return res.status(200).json({
                message: `Lista de sistemas do agente ${agent}.`,
                data: integrations,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
exports.default = new AgentController();
//# sourceMappingURL=AgentController.js.map