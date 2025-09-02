export interface System {
  id?:string;
  name: string;
  owner_user_id:string | undefined;
  id_type: string | undefined;
  connection_type: 'api' | 'snmp' | 'ping' | 'webhook';
  status: 'up' | 'maintenance' | 'down';
  criticality_level: 'low' | 'medium' | 'high'  | 'critical';
  sla_target: number;
  check_interval: number;
  target: string;
  company_id:string | undefined
}
