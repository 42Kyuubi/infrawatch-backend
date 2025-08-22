export interface System {
  name: string;
  owner_user_id:string;
  type: 'server' | 'network' | 'app';
  connection_type: 'api' | 'snmp' | 'ping' | 'webhook';
  status: 'up' | 'down';
  criticality_level: number;
  sla_target: number;
  check_interval: number;
}
