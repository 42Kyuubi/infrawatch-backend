export interface DataMetrics {
  system_id: string;
  status: string;
  uptime_percent: number;
  downtime_minutes: number;
  sla_percent: number;
  value: {
    ram:null,
    cpu:null,
    disk:null,
    packetLoss:0,
    latency: number | null; 

  };
  last_check: string; 
}
