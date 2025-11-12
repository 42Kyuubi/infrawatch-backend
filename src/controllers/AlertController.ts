import { Request, Response } from 'express'; 
import AlertService from '../services/AlertService';
import LogService from '../services/LogService';
import { sendSystemDownEmail } from '../infra/notify/send';
import SystemService from '../services/SystemService';
import supabase from '../infra/supabase/connect';
import UserService from '../services/UserService';
import CompanyService from '../services/CompanyService';
import { createTicket } from '../infra/glpi/connect';
import { Alerts } from '../interface/Alerts';
import { enviarSMS } from '../infra/notify/sendTwillo';
 
 
const notifiedSystems = new Set<Alerts>();

export async function startSystemWatcher() {
const channel = supabase
  .channel("system-changes")
  .on(
    "postgres_changes",
    {
      event: "*", // continua ouvindo INSERT, UPDATE e DELETE
      schema: "public",
      table: "systems",
    },
    async (payload: any) => {
      try {
        const oldSystem = payload.old;
        const newSystem = payload.new;

        // Garante que há dados antigos e novos (UPDATE)
        if (!oldSystem || !newSystem) return;

        // Só segue se o STATUS mudou
        if (oldSystem.status === newSystem.status) return;

        if (newSystem.status === "down") {
          if (!notifiedSystems.has(newSystem.id)) {
            const user = await UserService.getById(newSystem.owner_user_id);

            await sendSystemDownEmail({
              systemName: newSystem.name,
              downSince: new Date().toISOString(),
              emailTo: user?.email,
            });

            await enviarSMS(
              `🚨 Alerta: Sistema ${newSystem.name} está DOWN desde ${new Date().toISOString()}`
            );

            notifiedSystems.add(newSystem.id);

            new LogService({
              system_id: newSystem.id,
              event_type: "create",
              description: `Enviado alerta de sistema down: ${newSystem.name}`,
              company_id: newSystem.company_id,
            });

            await AlertService.create({
              system_id: newSystem.id,
              trigger_condition: newSystem.name,
              notification_type: "email",
              recipient: `Sistema ${newSystem.name} está down`,
              sent_at: new Date().toISOString(),
              company_id: newSystem.company_id,
            });

            const companyGLPI = await CompanyService.getById(
              String(newSystem.company_id)
            );

            if (companyGLPI?.glpi === true) {
              createTicket({
                name: newSystem.name,
                content: "Sistema no estado down",
                status: 1,
                urgency: 4,
                impact: 4,
              });
            }
          }
        } else {
          // Se o status mudou para algo diferente de "down"
          if (notifiedSystems.has(newSystem.id)) {
            notifiedSystems.delete(newSystem.id);
            console.log(`✅ Sistema ${newSystem.name} voltou ao normal.`);
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

console.log("🔎 SystemWatcher iniciado e ouvindo mudanças de status...");
return channel;
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