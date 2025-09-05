export interface DataMetrics {
    system_id: string;
    status: string;
    uptime_percent: number;
    downtime_minutes: number;
    sla_percent: number;
    value: {
        response_time: number | null;
        error_message: string | null;
        output: string | null;
        latency: number | null;
        packetLoss: number | null;
    };
    last_check: string;
}
//# sourceMappingURL=Metric.d.ts.map