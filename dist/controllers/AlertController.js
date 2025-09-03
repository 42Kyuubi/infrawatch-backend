"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSystemWatcher = startSystemWatcher;
const AlertService_1 = __importDefault(require("../services/AlertService"));
const LogService_1 = __importDefault(require("../services/LogService"));
const send_1 = require("../infra/notify/send");
const connect_1 = __importDefault(require("../infra/supabase/connect"));
const UserService_1 = __importDefault(require("../services/UserService"));
const CompanyService_1 = __importDefault(require("../services/CompanyService"));
const connect_2 = require("../infra/glpi/connect");
const notifiedSystems = new Set();
async function startSystemWatcher() {
    const channel = connect_1.default
        .channel("system-changes")
        .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "systems",
    }, async (payload) => {
        try {
            const system = payload.new;
            if (!system)
                return;
            if (system.status === "down") {
                if (!notifiedSystems.has(system.id)) {
                    const user = await UserService_1.default.getById(system.owner_user_id);
                    await (0, send_1.sendSystemDownEmail)({
                        systemName: system.name,
                        downSince: new Date().toISOString(),
                        emailTo: user?.email
                    });
                    notifiedSystems.add(system.id);
                    new LogService_1.default({
                        system_id: system.id,
                        event_type: "create",
                        description: `Enviado alerta de sistema down: ${system.name}`,
                        company_id: system.company_id,
                    });
                    const companyGLPI = await CompanyService_1.default.getById(String(system.company_id));
                    if (companyGLPI?.glpi === true) {
                        (0, connect_2.createTicket)({
                            name: system.name,
                            content: "Sistema no estado down",
                            status: 1,
                            urgency: 4,
                            impact: 4,
                        });
                    }
                }
            }
            else {
                if (notifiedSystems.has(system.id)) {
                    notifiedSystems.delete(system.id);
                }
            }
        }
        catch (err) {
            new LogService_1.default({
                system_id: payload.new?.id,
                event_type: "error",
                description: err.message,
                company_id: payload.new?.company_id,
            });
        }
    })
        .subscribe();
    console.log("🔎 SystemWatcher iniciado e ouvindo mudanças...");
}
class AlertController {
    async getAll(req, res) {
        try {
            const alerts = await AlertService_1.default.getAll();
            return res.status(200).json({
                message: 'Lista de Alertas.',
                data: alerts,
            });
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
exports.default = new AlertController();
//# sourceMappingURL=AlertController.js.map