import { snmpCheck } from './checks/snmpCheck';
import { Apicheck } from './checks/apicheck'; 
import supabase from '../supabase/connect';
import { PingCheck } from './checks/pingCheck';

interface SystemRecord
{
  id: number;
  name: string;
  connection_type: 'ping' | 'snmp' | 'api' | 'webhook';
  target: string;
  check_interval: number;
  config?: any;
}

async function saveResult(systemId: number, result: any) {
  const { error } = await supabase.from('metrics').insert({
    system_id: systemId,
    status: result.status,
    response_time: result.time || null,
    data: result.data || null,
    headers: result.headers || null,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error(`[DB ERROR] Falha ao salvar resultado do sistema ${systemId}:`, error.message);
  }
}

function scheduleSystem(system: SystemRecord) {
  console.log(`[Scheduler] Agendando "${system.name}" (${system.connection_type}) a cada ${system.check_interval}s`);

  setInterval(async () => {
    let result: any = { status: 'UNKNOWN' };

    try {
     if (system.connection_type === 'ping') {
        result = await PingCheck(system.target);
      } else if (system.connection_type === 'snmp') {
        const oid = system.config?.oid || '1.3.6.1.2.1.1.1.0';
        result = await snmpCheck(system.target, oid);
      } else  if (system.connection_type === 'api') {
        result = await Apicheck(system.target);
      } else {
        console.warn(`[Scheduler] Tipo de conexão não suportado: ${system.connection_type}`);
      }

     // await saveResult(system.id, result);
      console.log(`[Scheduler] ${system.name} → ${result.status}`);
    } catch (err) {
      console.error(`[Scheduler] Erro ao executar check de ${system.name}:`, err);
    }

  }, system.check_interval * 1000);
}

export async function startScheduler() {
  console.log('[Scheduler] Carregando sistemas...');
  const { data: systems, error } = await supabase.from('systems').select('*');

  if (error) {
    console.error('[DB ERROR] Falha ao buscar sistemas:', error.message);
    return;
  }

  if (!systems || systems.length === 0) {
    console.warn('[Scheduler] Nenhum sistema cadastrado para monitorar.');
    return;
  }

  systems.forEach((system: SystemRecord) => {
    scheduleSystem(system);
  });
}
