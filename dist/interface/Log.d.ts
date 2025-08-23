type EventType = "login" | "logout" | "error" | "update" | "create" | "delete";
export interface Log {
    id?: string;
    system_id?: string | null;
    user_id?: string | null;
    event_type: EventType;
    description?: string | {};
    company_id: string | undefined;
}
export {};
//# sourceMappingURL=Log.d.ts.map