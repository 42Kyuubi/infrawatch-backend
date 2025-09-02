import { Request, Response } from 'express'; 
import AlertService from '../services/AlertService';
import LogService from '../services/LogService';
import { sendSystemDownEmail } from '../infra/notify/send';
import SystemService from '../services/SystemService';
import supabase from '../infra/supabase/connect';
import UserService from '../services/UserService';
 
 
const notifiedSystems = new Set<number>();

export async function startSystemWatcher() {
  const channel = supabase
    .channel("system-changes")
    .on(
      "postgres_changes",
      {
        event: "*", // INSERT | UPDATE | DELETE
        schema: "public",
        table: "systems",
      },
      async (payload) => {
        try {
          const system = payload.new;

          if (!system) return;

        
          if (system.status === "down") {
            if (!notifiedSystems.has(system.id)) {
            const user = await UserService.getById(system.owner_user_id);
              await sendSystemDownEmail({
                systemName: system.name,
                downSince: new Date().toISOString(),
                emailTo:user.email
              });

              
              notifiedSystems.add(system.id);

              new LogService({
                system_id: system.id,
                event_type: "create",
                description: `Enviado alerta de sistema down: ${system.name}`,
                company_id: system.company_id,
              });
            }
          } else {
           
            if (notifiedSystems.has(system.id)) {
              notifiedSystems.delete(system.id);
            }
          }
        } catch (err: any) {
          new LogService({
            system_id: payload.new?.id,
            event_type: "error",
            description: err.message,
            company_id: payload.new?.company_id,
          });
        }
      }
    )
    .subscribe();

  console.log("🔎 SystemWatcher iniciado e ouvindo mudanças...");
}


class AlertController {

 
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const alerts = await AlertService.getAll();
      return res.status(200).json({
        message: 'Lista de Alertas.',
        data: alerts,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
 
}

export default new AlertController();