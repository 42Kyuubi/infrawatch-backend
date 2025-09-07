"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
class NotificationService {
    templateService;
    resend;
    twilio;
    deps;
    constructor(templateService, resend, twilio, deps) {
        this.templateService = templateService;
        this.resend = resend;
        this.twilio = twilio;
        this.deps = deps;
    }
    async createAndSend(templateId, recipientId, data, channels) {
        const template = await this.deps.getTemplateById(templateId);
        const recipient = await this.deps.getRecipientById(recipientId);
        // Salvar notificação
        const notification = await this.deps.saveNotification({
            templateId,
            recipientId,
            payload: data,
            status: "pending",
            created_at: new Date().toISOString(),
        });
        // Renderizar template
        const { subject, body } = this.templateService.render(template, data);
        // Enviar diretamente
        try {
            for (const channel of channels) {
                if (channel === 'email' && recipient.email) {
                    const result = await this.resend.send(recipient.email, subject || 'Alerta', body);
                    await this.deps.saveNotification({ id: notification.id, status: 'sent', provider_id: result.id });
                }
                else if (channel === 'sms' && recipient.phone) {
                    const result = await this.twilio.send(recipient.phone, body);
                    await this.deps.saveNotification({ id: notification.id, status: 'sent', provider_id: result.id });
                }
            }
        }
        catch (error) {
            await this.deps.saveNotification({ id: notification.id, status: 'failed', error: error.message });
            throw error;
        }
        return notification;
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=NotificationService.js.map