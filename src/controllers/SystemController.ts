import { Request, Response } from 'express'; 
import { SystemSchema } from '../schemas/SystemSchema';
import SystemService from '../services/SystemService';

class SystemController {

  async create(req: Request, res: Response): Promise<Response> {
    const parsed =SystemSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.format();
      return res.status(400).json({ errors });
    }

    const data = {
        ...parsed.data,
        owner_user_id:req.user?.id || ""
    }
    console.log(data);
    try {
      const system = await SystemService.create(data);
      return res.status(201).json({
        message: 'sistema cadastrado com sucesso.',
        system: system,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const employees = await SystemService.getAll();
      return res.status(200).json({
        message: 'Lista de Sistemas.',
        data: employees,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.params;
      const employee = await SystemService.getById(Number(id));
      return res.status(200).json({
        message: 'User.',
        data: employee,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await SystemService.delete(Number(id));
      return res.status(200).json({ message: 'User deletado com sucesso.' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedUser = await SystemService.updatePartial(Number(id), updates);

      return res.status(200).json({
        message: 'User atualizado com sucesso.',
        data: updatedUser,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new SystemController();
