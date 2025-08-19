import supabase from '../infra/supabase/connect';
import { System } from '../models/System';

class SystemService {
  private table = 'systems';

  async create(systemData: System): Promise<System> {

    const { data, error } = await supabase
      .from(this.table)
      .insert(systemData)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to create system: ${error.message}`);

    return data as System;
  }

  async getAll(): Promise<System[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to list systems: ${error.message}`);

    return data as System[];
  }

  async getById(id: number): Promise<System | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to get system by ID: ${error.message}`);

    return data as System;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete system: ${error.message}`);
  }

  async updatePartial(id: number, updateData: Partial<System>): Promise<System> {
 
    const { data, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to update system: ${error.message}`);

    return data as System;
  }
  
}

export default new SystemService();
