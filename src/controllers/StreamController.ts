import { Request, Response } from 'express';  
import SystemService from '../services/SystemService'; 

class StreamController {
 
 async streamSystemAll(req: Request, res: Response) {
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
}

export default new StreamController();
