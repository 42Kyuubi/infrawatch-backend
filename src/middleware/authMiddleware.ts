import { Request, Response, NextFunction } from 'express';
import supabase from '../infra/supabase/connect';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.replace('Bearer ', '');

  const { data: { user }, error } = await supabase.auth.getUser(token);

    const { data:company_id } = await supabase
      .from("users")
      .select('company_id')
      .eq('id', user?.id)
      .single();

  if (error || !user) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
  
  (req as any).user = {
    ...user,
    ...company_id
  };

  next();
}
