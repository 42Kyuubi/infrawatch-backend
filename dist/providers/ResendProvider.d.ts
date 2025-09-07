export declare class ResendProvider {
    private from;
    private resend;
    constructor(apiKey: string, from: string);
    send(to: string, subject: string, html: string): Promise<{
        id: string;
    }>;
}
//# sourceMappingURL=ResendProvider.d.ts.map