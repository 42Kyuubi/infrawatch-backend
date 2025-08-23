"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduler = startScheduler;
const snmpCheck_1 = require("./checks/snmpCheck");
const apicheck_1 = require("./checks/apicheck");
const connect_1 = __importDefault(require("../supabase/connect"));
const pingCheck_1 = require("./checks/pingCheck");
async function saveResult(systemId, result) {
    const { error } = await connect_1.default.from('metrics').insert({
        system_id: systemId,
        status: result.status,
        response_time: result.time || null,
        data: result.data || null,
        headers: result.headers || null,
        created_at: new Date().toISOString(),
    });
    if (error) {
        console.error(`[DB ERROR] Falha ao salvar resultado do sistema ${systemId}:`, error.message);
    }
}
function scheduleSystem(system) {
    console.log(`[Scheduler] Agendando "${system.name}" (${system.connection_type}) a cada ${system.check_interval}s`);
    setInterval(async () => {
        let result = { status: 'UNKNOWN' };
        try {
            if (system.connection_type === 'ping') {
                result = await (0, pingCheck_1.PingCheck)(system.target);
            }
            else if (system.connection_type === 'snmp') {
                const oid = system.config?.oid || '1.3.6.1.2.1.1.1.0';
                result = await (0, snmpCheck_1.snmpCheck)(system.target, oid);
            }
            else if (system.connection_type === 'api') {
                result = await (0, apicheck_1.Apicheck)(system.target);
            }
            else {
                console.warn(`[Scheduler] Tipo de conexão não suportado: ${system.connection_type}`);
            }
            // await saveResult(system.id, result);
            console.log(`[Scheduler] ${system.name} → ${result.status}`);
        }
        catch (err) {
            console.error(`[Scheduler] Erro ao executar check de ${system.name}:`, err);
        }
    }, system.check_interval * 1000);
}
async function startScheduler() {
    console.log('[Scheduler] Carregando sistemas...');
    const { data: systems, error } = await connect_1.default.from('systems').select('*');
    if (error) {
        console.error('[DB ERROR] Falha ao buscar sistemas:', error.message);
        return;
    }
    if (!systems || systems.length === 0) {
        console.warn('[Scheduler] Nenhum sistema cadastrado para monitorar.');
        return;
    }
    systems.forEach((system) => {
        scheduleSystem(system);
    });
}
//# sourceMappingURL=scheduler.js.map