"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../infra/supabase/connect"));
const AuthService_1 = __importDefault(require("./AuthService"));
class EmployeeService {
    async create({ name, email, password, position }) {
        const { userId } = await AuthService_1.default.signUp({
            username: name,
            email,
            password,
        });
        if (!userId) {
            throw new Error('Failed to create user');
        }
        const { data, error } = await connect_1.default
            .from('employees')
            .insert({
            user_id: userId,
            name,
            position,
            created_at: new Date().toISOString(),
        })
            .select(`
    id,
    name,
    position,
    created_at,
    user:users(id, email, display_name)
  `)
            .single();
        if (error) {
            await connect_1.default.auth.admin.deleteUser(userId);
            throw new Error(`Failed to create employee: ${error.message}`);
        }
        return data;
    }
    async getAll() {
        const { data, error } = await connect_1.default
            .from('employees')
            .select(`
        id,
        name,
        position,
        created_at,
        user:users(id, email, display_name)
      `)
            .order('created_at', { ascending: false });
        if (error) {
            throw new Error(`Failed to list employees: ${error.message}`);
        }
        return data;
    }
}
exports.default = new EmployeeService();
//# sourceMappingURL=EmployeeService.js.map