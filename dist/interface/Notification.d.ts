export type Channel = "email" | "sms" | "push";
export interface Template {
    id: number;
    name: string;
    channel: Channel;
    subject?: string;
    body: string;
}
export interface Recipient {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    pushToken?: string;
}
export interface Notification {
    id: number;
    templateId: number;
    recipientId: number;
    payload: Record<string, any>;
    status: "queued" | "sent" | "failed";
    error?: string;
    createdAt: Date;
}
//# sourceMappingURL=Notification.d.ts.map