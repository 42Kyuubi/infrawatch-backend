import supabase from '../infra/supabase/connect';
import { DataMetrics } from '../interface/Metric'; 
class MatricsService {
  private table = 'metrics';

 
  async getAll(): Promise<DataMetrics[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*');

    if (error) throw new Error(`Failed to list metrics: ${error.message}`);

    return data;
  }

   
  
}

export default new MatricsService();
