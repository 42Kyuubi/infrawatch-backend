import supabase from '../infra/supabase/connect';
import {Alerts}  from '../interface/Alerts';

class AlertService {
  private table = 'alerts';

  async create(AlertsData: Alerts): Promise<Alerts> {

    const { data, error } = await supabase
      .from(this.table)
      .insert(AlertsData)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to create system: ${error.message}`);

    return data as Alerts;
  }

  async getAll(): Promise<Alerts[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('sent_at');

    if (error) throw new Error(`Failed to list systems: ${error.message}`);

    return data as Alerts[];
  }
 
 
}

export default new AlertService();
