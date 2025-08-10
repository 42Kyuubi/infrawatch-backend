import supabase from '../infra/supabase/connect';
import { User, UserDTO } from '../models/User';
import { passwordHash } from '../utils/passwordHash';
import AuthService from './AuthService';

class UserService {
  private table = 'users';

  async create({ name, email, password, role }: User): Promise<UserDTO> {

    const { userId } = await AuthService.signUp({
      username: name,
      email,
      password,
    });

    if (!userId) throw new Error('Failed to create user in Auth');

    const { data, error } = await supabase
      .from(this.table)
      .insert({
        id: userId,
        username:name,
        email,
        password_hash: await passwordHash(password),
        role,
      })
      .select('*')
      .single();

    if (error) {
      await supabase.auth.admin.deleteUser(userId);
      throw new Error(`Failed to create user in DB: ${error.message}`);
    }

    return data as UserDTO;
  }

  async getAll(): Promise<UserDTO[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to list users: ${error.message}`);

    return data as UserDTO[];
  }

  async getById(id: string): Promise<UserDTO | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to get user by ID: ${error.message}`);

    return data as UserDTO;
  }

  async delete(id: string): Promise<void> {
  
    const { error: dbError } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (dbError) throw new Error(`Failed to delete user in DB: ${dbError.message}`);

    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) throw new Error(`Failed to delete user in Auth: ${authError.message}`);
  }

  async updatePartial(id: string, updateData: Partial<UserDTO>): Promise<UserDTO> {
    const { data, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw new Error(`Failed to update user: ${error.message}`);

    return data as UserDTO;
  }
}

export default new UserService();
