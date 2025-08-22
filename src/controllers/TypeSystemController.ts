import { Request, Response } from 'express'; 
import { typeSystemSchema } from '../schemas/SystemSchema';
import SystemService from '../services/SystemService';
import TypeSystemService from '../services/TypeSystemService';

class TypeSystemController {

  async create(req: Request, res: Response): Promise<Response> {
    const parsed =typeSystemSchema.safeParse(req.body);
 
    if (!parsed.success) {
      const errors = parsed.error.format();
      return res.status(400).json({ errors });
    }

    const data = {
        ...parsed.data,
        company_id:req.user?.company_id || ""
    } 
    try {
      const typesystem = await TypeSystemService.create(data);
      return res.status(201).json({
        message: 'Tipo de sistema cadastrado com sucesso.',
        type_system: typesystem,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const typesystems = await TypeSystemService.getAll();
      return res.status(200).json({
        message: 'Lista de Tipos de Sistemas.',
        data: typesystems,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.params;
      const typesystem = await TypeSystemService.getById(String(id));
      return res.status(200).json({
        message: 'Tipo de Sistema.',
        data: typesystem,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await TypeSystemService.delete(String(id));
      return res.status(200).json({ message: 'tipo de sistema deletado com sucesso.' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updated = await TypeSystemService.updatePartial(String(id), updates);

      return res.status(200).json({
        message: 'Tipo de Sistema atualizado com sucesso.',
        data: updated,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

}

export default new TypeSystemController();
