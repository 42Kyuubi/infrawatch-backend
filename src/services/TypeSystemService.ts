import supabase from '../infra/supabase/connect';
import { System } from '../interface/System';

class TypeSystemService {
  private table = 'systems_types';

  async create(systemTypeData: {name:string,company_id:string}): Promise<System> {

    const { data, error } = await supabase
      .from(this.table)
      .insert(systemTypeData)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to create Type system: ${error.message}`);

    return data;
  }

  async getAll() {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to list Types systems: ${error.message}`);
    return data;
  }

  async getById(id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to get type system by ID: ${error.message}`);
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete  type system: ${error.message}`);
  }

  async updatePartial(id: string, updateData: Partial<System>) {
 
    const { data, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to update type system: ${error.message}`);
    return data;
  }
  
}

export default new TypeSystemService();
