export interface Alerts {
    id?: string;
    system_id?: string;
    trigger_condition: string;
    notification_type: "email" | "sms" | "webhook";
    recipient: string;
    sent_at: string | null;
    company_id?: string;
}
//# sourceMappingURL=Alerts.d.ts.map