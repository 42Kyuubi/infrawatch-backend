"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../infra/supabase/connect"));
class TypeSystemService {
    table = 'systems_types';
    async create(systemTypeData) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .insert(systemTypeData)
            .select('*')
            .single();
        if (error)
            throw new Error(`Failed to create Type system: ${error.message}`);
        return data;
    }
    async getAll() {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(`Failed to list Types systems: ${error.message}`);
        return data;
    }
    async getById(id) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(`Failed to get type system by ID: ${error.message}`);
        return data;
    }
    async delete(id) {
        const { error } = await connect_1.default
            .from(this.table)
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(`Failed to delete  type system: ${error.message}`);
    }
    async updatePartial(id, updateData) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .update(updateData)
            .eq('id', id)
            .select('*')
            .single();
        if (error)
            throw new Error(`Failed to update type system: ${error.message}`);
        return data;
    }
}
exports.default = new TypeSystemService();
//# sourceMappingURL=TypeSystemService.js.map