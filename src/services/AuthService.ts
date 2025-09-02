import supabase from '../infra/supabase/connect';

interface SignUpInput {
  username: string;
  email: string;
  password: string;
}

interface SignInInput {
  email: string;
  password: string;
}

class AuthService {
  async signUp({ username, email, password }: SignUpInput) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: username },
      },
    });

    if (error) throw new Error(error.message);

    return {
      userId: data.user?.id,
    };
  }

  async signIn({ email, password }: SignInInput) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
    throw new Error("Credenciais inválidas");
  }

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    };
  }

  async refresh(refresh_token: string) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token, 
    });

    if (error || !data.session) {
      console.log(error);
      throw new Error("Refresh inválido");
    }

    
    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in,
      user: data.session.user,
    };
  }
}

export default new AuthService();
