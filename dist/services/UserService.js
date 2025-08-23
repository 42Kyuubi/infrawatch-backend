"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../infra/supabase/connect"));
const passwordHash_1 = require("../utils/passwordHash");
const AuthService_1 = __importDefault(require("./AuthService"));
class UserService {
    table = 'users';
    async create({ username, email, password, role, company_id }) {
        const { userId } = await AuthService_1.default.signUp({
            username,
            email,
            password,
        });
        if (!userId)
            throw new Error('Failed to create user in Auth');
        const { data, error } = await connect_1.default
            .from(this.table)
            .insert({
            id: userId,
            username,
            email,
            password_hash: await (0, passwordHash_1.passwordHash)(password),
            role,
            company_id,
            status: 'active'
        })
            .select('*')
            .single();
        if (error) {
            await connect_1.default.auth.admin.deleteUser(userId);
            throw new Error(`Failed to create user in DB: ${error.message}`);
        }
        return data;
    }
    async getAll() {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(`Failed to list users: ${error.message}`);
        return data;
    }
    async getById(id) {
        const { data, error } = await connect_1.default
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(`Failed to get user by ID: ${error.message}`);
        return data;
    }
    async delete(id) {
        const { error: dbError } = await connect_1.default
            .from(this.table)
            .delete()
            .eq('id', id);
        if (dbError)
            throw new Error(`Failed to delete user in DB: ${dbError.message}`);
        const { error: authError } = await connect_1.default.auth.admin.deleteUser(id);
        if (authError)
            throw new Error(`Failed to delete user in Auth: ${authError.message}`);
    }
    async updatePartial(id, updateData) {
        const { email, password, username, ...tableFields } = updateData;
        let updatedUser = {};
        if (email || password || username) {
            const { data, error } = await connect_1.default.auth.admin.updateUserById(id, {
                email,
                password,
                user_metadata: {
                    display_name: username
                }
            });
            if (error) {
                throw new Error(`Failed to update user in Auth: ${error.message}`);
            }
            updatedUser = { ...updatedUser, ...data.user };
        }
        if (Object.keys(tableFields).length > 0 || email || username || password) {
            const { data, error } = await connect_1.default
                .from(this.table)
                .update({
                ...tableFields,
                ...(email && { email }),
                ...(username && { username }),
                ...(password && { password_hash: await (0, passwordHash_1.passwordHash)(password) }),
            })
                .eq('id', id)
                .select('*')
                .single();
            if (error) {
                throw new Error(`Failed to update user in DB: ${error.message}`);
            }
            updatedUser = { ...updatedUser, ...data };
        }
        return updatedUser;
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map