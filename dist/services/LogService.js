"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../infra/supabase/connect"));
class LogService {
    table = 'logs';
    constructor({ system_id = null, user_id = null, event_type, description, company_id }) {
        this.create({
            system_id,
            user_id,
            event_type,
            description,
            company_id
        });
    }
    async create(logsData) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .insert(logsData)
            .select('*')
            .single();
        if (error)
            throw new Error(`Failed to create log: ${error.message}`);
        return data;
    }
    async getAll() {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(`Failed to list logs: ${error.message}`);
        return data;
    }
    async getById(id) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(`Failed to get log by ID: ${error.message}`);
        return data;
    }
    async delete(id) {
        const { error } = await connect_1.default
            .from(this.table)
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(`Failed to delete log: ${error.message}`);
    }
}
exports.default = LogService;
//# sourceMappingURL=LogService.js.map