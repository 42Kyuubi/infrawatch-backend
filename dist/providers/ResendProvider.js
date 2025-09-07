"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendProvider = void 0;
const resend_1 = require("resend");
class ResendProvider {
    from;
    resend;
    constructor(apiKey, from) {
        this.from = from;
        this.resend = new resend_1.Resend(apiKey);
    }
    async send(to, subject, html) {
        const res = await this.resend.emails.send({
            from: this.from,
            to,
            subject,
            html,
        });
        return { id: res.data?.id || "no-id" };
    }
}
exports.ResendProvider = ResendProvider;
//# sourceMappingURL=ResendProvider.js.map