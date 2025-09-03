"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../infra/supabase/connect"));
class AlertService {
    table = 'alerts';
    async create(AlertsData) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .insert(AlertsData)
            .select('*')
            .single();
        if (error)
            throw new Error(`Failed to create system: ${error.message}`);
        return data;
    }
    async getAll() {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .order('sent_at');
        if (error)
            throw new Error(`Failed to list systems: ${error.message}`);
        return data;
    }
}
exports.default = new AlertService();
//# sourceMappingURL=AlertService.js.map