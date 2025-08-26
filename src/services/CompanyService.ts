import supabase from '../infra/supabase/connect';
import { Company } from '../interface/Company';
import { System } from '../interface/System';

class SystemService {
  private table = 'companies';

  async create(systemData: Company): Promise<System> {

    const { data, error } = await supabase
      .from(this.table)
      .insert(systemData)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to create company: ${error.message}`);

    return data as System;
  }

  async getAll(): Promise<Company[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to list companies: ${error.message}`);

    return data as Company[];
  }

  async getById(id: string): Promise<Company | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(`Failed to get company by ID: ${error.message}`);
    return data as Company;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete company: ${error.message}`);
  }

  async updatePartial(id: string, updateData: Partial<Company>): Promise<Company> {
 
    const { data, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to update company: ${error.message}`);

    return data as Company;
  }
  
}

export default new SystemService();
