import { TemplateService } from "./TemplateService";
import { ResendProvider } from "../providers/ResendProvider";
import { TwilioProvider } from "../providers/TwilioProvider";
export declare class NotificationService {
    private templateService;
    private resend;
    private twilio;
    private deps;
    constructor(templateService: TemplateService, resend: ResendProvider, twilio: TwilioProvider, deps: {
        saveNotification: (data: any) => Promise<any>;
        getTemplateById: (id: number) => Promise<any>;
        getRecipientById: (id: number) => Promise<any>;
    });
    createAndSend(templateId: number, recipientId: number, data: Record<string, any>, channels: ("email" | "sms")[]): Promise<any>;
}
//# sourceMappingURL=NotificationService.d.ts.map