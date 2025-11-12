import { Request, Response } from 'express';  
import SystemService from '../services/SystemService'; 
import MatricsService from '../services/MatricsService';
import IntegrationService from '../services/IntegrationService';

class StreamController {
 
async streamSystemsWithMetrics(req: Request, res: Response) {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const sendData = async () => {
      try {
        const systems = await SystemService.getAll();
        const metrics = await MatricsService.getAll();

        const enriched = systems.map((sys) => {
          const metric = metrics.find((m) => m.system_id === sys.id);
          return { ...sys, metric: metric || null };
        });

        res.write(`data: ${JSON.stringify(enriched)}\n\n`);
      } catch (error) {
        console.error("[SSE ERROR] Failed to send data:", error);
        res.write(`event: error\ndata: ${JSON.stringify({ message: "Failed to fetch data" })}\n\n`);
      }
    };


    // primeira resposta
    await sendData();

    // envia de 1 em 1s
    const interval = setInterval(sendData, 1000);

    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });
  } catch (err: any) {
    console.error("SSE error:", err);
    res.end();
  }
}


 async streamMetricsAll(req: Request, res: Response) {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();  

    const systems = await MatricsService.getAll();
    res.write(`data: ${JSON.stringify(systems)}\n\n`);

    const interval = setInterval(async () => {
      const systems = await MatricsService.getAll();
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

  async streamIntegrationsAll(req: Request, res: Response) {
 
      try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();  

    const systems = await  IntegrationService.getAll();
    res.write(`data: ${JSON.stringify(systems)}\n\n`);

    const interval = setInterval(async () => {
      const systems = await  IntegrationService.getAll(); 
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
}

export default new StreamController();
