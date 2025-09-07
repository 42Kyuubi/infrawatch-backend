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

   async create(systemData: DataMetrics): Promise<DataMetrics> {
  
      const { data, error } = await supabase
        .from(this.table)
        .insert(systemData)
        .select('*')
        .single();
  
      if (error) throw new Error(`Failed to create system: ${error.message}`);
  
      return data as DataMetrics;
    }

    
      async updatePartial(id: string, updateData: Partial<DataMetrics>) {
     
        const { data, error } = await supabase
          .from(this.table)
          .update(updateData)
          .eq('id', id)
          .select('*')
          .single();
    
        if (error) throw new Error(`Failed to update type DataMetrics: ${error.message}`);
        return data;
      }
   
  
}

export default new MatricsService();
