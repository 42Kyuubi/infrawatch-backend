"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSystemDownEmail = sendSystemDownEmail;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
function systemDownTemplate({ systemName, downSince, dashboardUrl, supportEmail }) {
    return `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      
      <h2 style="color: #d32f2f;">🚨 Alerta de Indisponibilidade</h2>
      
      <p style="font-size: 16px; color: #333;">
        O sistema <strong>${systemName}</strong> está fora do ar desde:
      </p>
      
      <p style="font-size: 16px; font-weight: bold; color: #000;">
        ⏱ ${downSince}
      </p>
      
      <div style="margin-top: 20px;">
        <a href="${dashboardUrl}" style="display: inline-block; background: #1976d2; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Ver Dashboard
        </a>
      </div>
      
      <p style="font-size: 14px; color: #555; margin-top: 20px;">
        Entre em contacto com Gerente para restaurar o sistema.<br/>
        Para suporte imediato, entre em contacto:<br/>
        <a href="mailto:${supportEmail}" style="color: #1976d2;">${supportEmail}</a>
      </p>
    </div>
  </div>
  `;
}
async function sendSystemDownEmail({ systemName, downSince, emailTo }) {
    const html = systemDownTemplate({
        systemName,
        downSince: downSince,
        dashboardUrl: "https://infra-watch.com",
        supportEmail: "suporte@infrawatch.com",
    });
    try {
        const data = await resend.emails.send({
            from: "Infrawatch <geral@infra-watch.tech>",
            to: emailTo,
            subject: `[ALERTA] ${systemName} está indisponível`,
            html,
        });
        console.log("📧 Email enviado com sucesso:", data);
    }
    catch (error) {
        console.error("❌ Erro ao enviar email:", error);
    }
}
//# sourceMappingURL=send.js.map