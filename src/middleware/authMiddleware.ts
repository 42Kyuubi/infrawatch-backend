import { Request, Response, NextFunction } from 'express';
import supabase from '../infra/supabase/connect';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return handleUnauthorized(req, res, "Token não fornecido.");
  }

  const token = authHeader.replace('Bearer ', '');

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return handleUnauthorized(req, res, "Token inválido ou expirado.");
  }

  const { data: company_id } = await supabase
    .from("users")
    .select('company_id')
    .eq('id', user?.id)
    .single();

  (req as any).user = { ...user, ...company_id };
  next();
}


function handleUnauthorized(req: Request, res: Response, message: string) {

  if (req.headers.accept?.includes("text/event-stream")) {
    res.setHeader("Content-Type", "text/event-stream");
    res.write(`event: error\ndata: ${JSON.stringify({ error: message })}\n\n`);
    return res.end();
  }
  return res.status(401).json({ error: message });
}
