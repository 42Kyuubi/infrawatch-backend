"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../infra/supabase/connect"));
class MatricsService {
    table = 'metrics';
    async getAll() {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*');
        if (error)
            throw new Error(`Failed to list metrics: ${error.message}`);
        return data;
    }
    async create(systemData) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .insert(systemData)
            .select('*')
            .single();
        if (error)
            throw new Error(`Failed to create system: ${error.message}`);
        return data;
    }
    async updatePartial(id, updateData) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .update(updateData)
            .eq('id', id)
            .select('*')
            .single();
        if (error)
            throw new Error(`Failed to update type DataMetrics: ${error.message}`);
        return data;
    }
}
exports.default = new MatricsService();
//# sourceMappingURL=MatricsService.js.map