import supabase from '../infra/supabase/connect'; 
import { Integration } from '../interface/Integration'; 

class IntegrationService {
  private table = 'integration';

  async create(systemData: any): Promise<Integration> {

    const { data, error } = await supabase
      .from(this.table)
      .insert(systemData)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to create integration: ${error.message}`);

    return data as Integration;
  }

  async findByToken(token: string): Promise<Integration | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('token', token)
      .single();
    if (error) throw new Error(`Failed to get Integration by ID: ${error.message}`);
    return data as Integration;
  }

  async getAll(): Promise<Integration[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('date_time');

    if (error) throw new Error(`Failed to list integration: ${error.message}`);

    return data as Integration[];
  }

  async getById(id: string): Promise<Integration | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(`Failed to get Integration by ID: ${error.message}`);
    return data as Integration;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete Integration: ${error.message}`);
  }

  async updatePartial(id: string, updateData: Partial<Integration>): Promise<Integration> {
 
    const { data, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to update Integration: ${error.message}`);

    return data as Integration;
  }
  
}

export default new IntegrationService();
