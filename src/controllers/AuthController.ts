import { Request, Response } from 'express';
import { signUpSchema } from '../schemas/SignUpSchema';
import { signInSchema } from '../schemas/SignInSchema';
import AuthService from '../services/AuthService';

class AuthController {
  async signUp(req: Request, res: Response): Promise<Response> {
    const parsed = signUpSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.format();
      return res.status(400).json({ errors });
    }

    try {
      const result = await AuthService.signUp(parsed.data);
      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso.',
        userId: result.userId,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async signIn(req: Request, res: Response): Promise<Response> {
    const parsed = signInSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.format();
      return res.status(400).json({ errors });
    }

    try {
      const result = await AuthService.signIn(parsed.data);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
}

export default new AuthController();