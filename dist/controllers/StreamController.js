"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SystemService_1 = __importDefault(require("../services/SystemService"));
const MatricsService_1 = __importDefault(require("../services/MatricsService"));
const IntegrationService_1 = __importDefault(require("../services/IntegrationService"));
class StreamController {
    async streamSystemsWithMetrics(req, res) {
        try {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
            res.flushHeaders();
            const sendData = async () => {
                const systems = await SystemService_1.default.getAll();
                const metrics = await MatricsService_1.default.getAll();
                // junta métricas dentro de cada sistema
                const enriched = systems.map((sys) => {
                    const metric = metrics.find((m) => m.system_id === sys.id);
                    return { ...sys, metric: metric || null };
                });
                res.write(`data: ${JSON.stringify(enriched)}\n\n`);
            };
            // primeira resposta
            await sendData();
            // envia de 1 em 1s
            const interval = setInterval(sendData, 1000);
            req.on("close", () => {
                clearInterval(interval);
                res.end();
            });
        }
        catch (err) {
            console.error("SSE error:", err);
            res.end();
        }
    }
    async streamMetricsAll(req, res) {
        try {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
            res.flushHeaders();
            const systems = await MatricsService_1.default.getAll();
            res.write(`data: ${JSON.stringify(systems)}\n\n`);
            const interval = setInterval(async () => {
                const systems = await MatricsService_1.default.getAll();
                res.write(`data: ${JSON.stringify(systems)}\n\n`);
            }, 1000);
            req.on("close", () => {
                clearInterval(interval);
                res.end();
            });
        }
        catch (err) {
            console.error("SSE error:", err);
            res.end();
        }
    }
    async streamIntegrationsAll(req, res) {
        try {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
            res.flushHeaders();
            const systems = await IntegrationService_1.default.getAll();
            res.write(`data: ${JSON.stringify(systems)}\n\n`);
            const interval = setInterval(async () => {
                const systems = await IntegrationService_1.default.getAll();
                res.write(`data: ${JSON.stringify(systems)}\n\n`);
            }, 1000);
            req.on("close", () => {
                clearInterval(interval);
                res.end();
            });
        }
        catch (err) {
            console.error("SSE error:", err);
            res.end();
        }
    }
}
exports.default = new StreamController();
//# sourceMappingURL=StreamController.js.map