import { Request, Response } from 'express'; 
import { SystemSchema } from '../schemas/SystemSchema';
import SystemService from '../services/SystemService';
import LogService from '../services/LogService';

class SystemController {

  async create(req: Request, res: Response): Promise<Response> {
    const parsed = SystemSchema.safeParse(req.body);

    
    if (!parsed.success) {
      const errors = parsed.error.format();
      return res.status(400).json({ errors });
    }

    const data = {
        owner_user_id:req.user?.id,
        company_id:req.user?.company_id,
        agent:"none",
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
      const systems = await SystemService.getAll();
      return res.status(200).json({
        message: 'Lista de Sistemas.',
        data: systems,
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

 async streamAll(req: Request, res: Response) {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const systems = await SystemService.getAll();
    res.write(`data: ${JSON.stringify(systems)}\n\n`);

    const interval = setInterval(async () => {
      const systems = await SystemService.getAll();
      res.write(`data: ${JSON.stringify(systems)}\n\n`);
    }, 1000);

    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });

  } catch (err: any) {
    console.error("SSE error:", err);
    res.end();
  }
}


  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await SystemService.delete(String(id));

          new LogService({
          system_id:null,
          user_id:req.user?.id,
          event_type:"delete",
          description:"sistema eliminado: "+{system_id: id},
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

      const updatedUser = await SystemService.updatePartial(String(id), updates);
        new LogService({
        system_id:id,
        user_id:req.user?.id,
        event_type:"update",
        description:updatedUser,
        company_id: req.user?.company_id});

      return res.status(200).json({
        message: 'Sistema atualizado com sucesso.',
        data: updatedUser,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

}

export default new SystemController();
