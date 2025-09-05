"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../infra/supabase/connect"));
class AgentService {
    async getAllByAgent(agent) {
        const { data, error } = await connect_1.default
            .from("systems")
            .select("*")
            .eq("agent", agent);
        if (error)
            throw new Error(error.message);
        return data;
    }
}
exports.default = new AgentService();
//# sourceMappingURL=AgentService.js.map