"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SystemService_1 = __importDefault(require("../services/SystemService"));
class StreamController {
    async streamSystemAll(req, res) {
        try {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
            res.flushHeaders();
            const systems = await SystemService_1.default.getAll();
            res.write(`data: ${JSON.stringify(systems)}\n\n`);
            const interval = setInterval(async () => {
                const systems = await SystemService_1.default.getAll();
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