"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../infra/supabase/connect"));
class IntegrationService {
    table = 'integration';
    async create(systemData) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .insert(systemData)
            .select('*')
            .single();
        if (error)
            throw new Error(`Failed to create integration: ${error.message}`);
        return data;
    }
    async findByToken(token) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .eq('token', token)
            .single();
        if (error)
            throw new Error(`Failed to get Integration by ID: ${error.message}`);
        return data;
    }
    async getAll() {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .order('date_time');
        if (error)
            throw new Error(`Failed to list integration: ${error.message}`);
        return data;
    }
    async getById(id) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(`Failed to get Integration by ID: ${error.message}`);
        return data;
    }
    async delete(id) {
        const { error } = await connect_1.default
            .from(this.table)
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(`Failed to delete Integration: ${error.message}`);
    }
    async updatePartial(id, updateData) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .update(updateData)
            .eq('id', id)
            .select('*')
            .single();
        if (error)
            throw new Error(`Failed to update Integration: ${error.message}`);
        return data;
    }
}
exports.default = new IntegrationService();
//# sourceMappingURL=IntegrationService.js.map