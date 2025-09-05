import { Request, Response } from 'express';  
import LogService from '../services/LogService'; 
import IntegrationService from '../services/IntegrationService';
import CompanyService from '../services/CompanyService'; 

class IntegrationController {
 
 async create(req: Request, res: Response): Promise<Response> {
    const parsed = (req.body);
    const data= {
     token: parsed.agent_token,
     type: parsed.id_type === '1'? "AGENT" : "GPLI",
     APP_TOKEN: parsed.api_token,
     API_URL: parsed.api_url, 
     AUTH_TOKEN: parsed.auth_token,
     status:'inative',
    }    
     
    try {
      const Integration = await IntegrationService.create(data);
      if (Integration.type === 'GLPI') {
        await CompanyService.updatePartial(
          String(req.user?.company_id),
          { glpi: true }
        );
      }
        new LogService({ 
        user_id:req.user?.id,
        event_type:"create",
        description:Integration,
        company_id: req.user?.company_id});

      return res.status(201).json({
        message: 'Integration cadastrado com sucesso.',
        system: Integration,
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
      const Integration = await IntegrationService.getAll();
      return res.status(200).json({
        message: 'Lista de Integration.',
        data: Integration,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.params;
      const Integration = await IntegrationService.getById(String(id));
      return res.status(200).json({
        message: 'Integration.',
        data: Integration,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await IntegrationService.delete(String(id));

          new LogService({
 
          user_id:req.user?.id,
          event_type:"delete",
          description:{Integration: id},
          company_id: req.user?.company_id});

      return res.status(200).json({ message: 'Integration deletado com sucesso.' });
    } catch (err: any) {

        new LogService({
        user_id:req.user?.id,
        event_type:"error",
        description:err.message,
        company_id: req.user?.company_id});

      return res.status(500).json({ error: err.message });
    }
  }
 
}

export default new IntegrationController();
