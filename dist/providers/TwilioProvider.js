"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioProvider = void 0;
const twilio_1 = __importDefault(require("twilio"));
class TwilioProvider {
    from;
    client;
    constructor(accountSid, authToken, from) {
        this.from = from;
        this.client = (0, twilio_1.default)(accountSid, authToken);
    }
    async send(to, body) {
        const msg = await this.client.messages.create({
            from: this.from,
            to,
            body,
        });
        return { id: msg.sid };
    }
}
exports.TwilioProvider = TwilioProvider;
//# sourceMappingURL=TwilioProvider.js.map