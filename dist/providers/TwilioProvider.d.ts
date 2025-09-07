export declare class TwilioProvider {
    private from;
    private client;
    constructor(accountSid: string, authToken: string, from: string);
    send(to: string, body: string): Promise<{
        id: string;
    }>;
}
//# sourceMappingURL=TwilioProvider.d.ts.map