import { Request, Response } from "express";
import { MonitoringService } from "../services/monitoring/MonitoringService";
import SystemService from "../services/SystemService";

class MonitoringController {
  
  async checkAllSystem(req: Request, res: Response): Promise<void> {
    try {
      const systems = await SystemService.getAll();
      const result = await (new MonitoringService()).checkAllSystems(systems);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

    async checkSystemById(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.params;
      const systems = await SystemService.getById(Number(id));
      const result = await (new MonitoringService()).checkSystem(systems);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}

export default new MonitoringController();