import { Request, Response } from 'express';  
import IntegrationService from "../services/IntegrationService";
import LogService from "../services/LogService";
import SystemService from "../services/SystemService";
import AgentService from '../services/AgentService';

class AgentController 
{
    async validationAgent(req: Request, res: Response): Promise<Response> {
      const parsed = req.body;
    
      const data = {
        token:parsed.token,
        region:parsed.region,
        cod_agent:parsed.code_agent,
        country:parsed.country,
        city:parsed.city,
        latitude:parsed.latitude,
        longitude:parsed.longitude,
        date_time:parsed.date_time || (new Date),
        status:"active",
      }
    
      try {
        const existingIntegration = await IntegrationService.findByToken(parsed.token);
    
        if (!existingIntegration) {
          new LogService({
            user_id: req.user?.id,
            event_type: "error",
            description: `Token inválido: ${parsed.token}`,
            company_id: req.user?.company_id
          });
    
          return res.status(400).json({
            result:'KO',
            message: "Token inválido ou integração não encontrada."
          });
        }
    
        if (existingIntegration.status === "active") {
          new LogService({
            user_id: req.user?.id,
            event_type: "error",
            description: `Token já ativo: ${parsed.token}`,
            company_id: req.user?.company_id
          });
    
          return res.status(400).json({
            result:'KO',
            message: "Token inválido ou já ativo."
          });
        }
    
        const integration = await IntegrationService.updatePartial(
          String(existingIntegration.id),
          data
        );
    
        new LogService({
          user_id: req.user?.id,
          event_type: "update",
          description: integration,
          company_id: req.user?.company_id
        });
    
        return res.status(200).json({
          message: "Integration ativada com sucesso.",
          result:'OK', 
          system: integration
        });
      } catch (err: any) {
        new LogService({
          user_id: req.user?.id,
          event_type: "error",
          description: err.message,
          company_id: req.user?.company_id
        });
    
        return res.status(400).json({result:'KO', error: "Token inválido ou integração não encontrada." });
      }
    }
     
    async createAgentSystem(req: Request, res: Response): Promise<Response> {
        const parsed = (req.body);
        const data:any= { 
          id_system_aget:parsed.id,
          name: parsed.nome,
          id_type: parsed.idType,
          connection_type: parsed.conectionType,
          status: parsed.status,
          check_interval: parsed.checkInterval,
          created_at:  parsed.dataTime,
          target: parsed.target, 
          company_id:parsed.company_id,
          agent: parsed.idAgent
        }    
         
        try {
          const Integration = await SystemService.create(data);
         
            new LogService({ 
            user_id:req.user?.id,
            event_type:"create",
            description:`Upload de sistemas do Agent ${Integration}`,
            company_id: req.user?.company_id});
    
          return res.status(201).json({
            message: 'Sistema do Agent cadastrado com sucesso.',
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
    
    async getSystemAllByAgent(req: Request, res: Response): Promise<Response> {
        try {
            const { agent } = req.params;
            if(!agent)
                 return res.status(500).json({ error: "Token Invalido!" });

            const integrations = await AgentService.getAllByAgent(agent);

            return res.status(200).json({
            message: `Lista de sistemas do agente ${agent}.`,
            data: integrations,
            });
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }
 

}
export default new AgentController();