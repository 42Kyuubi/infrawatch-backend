import { Request, Response } from 'express'; 
import { SystemSchema } from '../schemas/SystemSchema';
import SystemService from '../services/SystemService';
import LogService from '../services/LogService';
import CompanyService from '../services/CompanyService';

class CompanyController {

  async create(req: Request, res: Response): Promise<Response> {
    const parsed = SystemSchema.safeParse(req.body);
 
    if (!parsed.success) {
      const errors = parsed.error.format();
      return res.status(400).json({ errors });
    }

    const data = {
        owner_user_id:req.user?.id,
        company_id:req.user?.company_id,
        ...parsed.data,
    }

    try {
      const system = await SystemService.create(data);

        new LogService({
        system_id:system.id,
        user_id:req.user?.id,
        event_type:"create",
        description:system,
        company_id: req.user?.company_id});

      return res.status(201).json({
        message: 'sistema cadastrado com sucesso.',
        system: system,
      });
    } catch (err: any) {

         new LogService({
        user_id:req.user?.id,
        event_type:"error",
        description:err.message,
        company_id: req.user?.company_id});

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
      const employee = await SystemService.getById(String(id));
      return res.status(200).json({
        message: 'Sistema.',
        data: employee,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await SystemService.delete(String(id));

          new LogService({
          system_id:id,
          user_id:req.user?.id,
          event_type:"delete",
          description:{system_id: id},
          company_id: req.user?.company_id});

      return res.status(200).json({ message: 'Sistema deletado com sucesso.' });
    } catch (err: any) {

        new LogService({
        user_id:req.user?.id,
        event_type:"error",
        description:err.message,
        company_id: req.user?.company_id});

      return res.status(500).json({ error: err.message });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedUser = await CompanyService.updatePartial(String(id), updates);
        new LogService({
        system_id:id,
        user_id:req.user?.id,
        event_type:"update",
        description:updatedUser,
        company_id: req.user?.company_id});

      return res.status(200).json({
        message: 'Company atualizado com sucesso.',
        data: updatedUser,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

}

export default new CompanyController();
