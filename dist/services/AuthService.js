"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../infra/supabase/connect"));
class AuthService {
    async signUp({ username, email, password }) {
        const { data, error } = await connect_1.default.auth.signUp({
            email,
            password,
            options: {
                data: { display_name: username },
            },
        });
        if (error)
            throw new Error(error.message);
        return {
            userId: data.user?.id,
        };
    }
    async signIn({ email, password }) {
        const { data, error } = await connect_1.default.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            throw new Error("Credenciais inválidas");
        }
        return {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_in: data.session.expires_in,
            user: {
                id: data.user.id,
                email: data.user.email,
            },
        };
    }
    async refresh(refresh_token) {
        const { data, error } = await connect_1.default.auth.refreshSession({
            refresh_token,
        });
        if (error || !data.session) {
            console.log(error);
            throw new Error("Refresh inválido");
        }
        return {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_in: data.session.expires_in,
            user: data.session.user,
        };
    }
}
exports.default = new AuthService();
//# sourceMappingURL=AuthService.js.map