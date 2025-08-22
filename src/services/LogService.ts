import supabase from "../infra/supabase/connect";
import { Log } from "../interface/Log";

class LogService
{
  private table = 'logs';

  constructor({
        system_id = null,
        user_id = null,
        event_type, 
        description,
        company_id
      }:Log) {  this.create({    
        system_id,
        user_id,
        event_type, 
        description,
        company_id
}); }
  async create(logsData: Log): Promise<Log> {

    const { data, error } = await supabase
      .from(this.table)
      .insert(logsData)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to create log: ${error.message}`);

    return data as Log;
  }

  async getAll(): Promise<Log[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to list logs: ${error.message}`);

    return data as Log[];
  }

  async getById(id: string): Promise<Log | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to get log by ID: ${error.message}`);

    return data as Log;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete log: ${error.message}`);
  }
  
}

export default LogService;