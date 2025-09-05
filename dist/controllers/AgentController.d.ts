import { Request, Response } from 'express';
declare class AgentController {
    validationAgent(req: Request, res: Response): Promise<Response>;
    createAgentSystem(req: Request, res: Response): Promise<Response>;
    getSystemAllByAgent(req: Request, res: Response): Promise<Response>;
}
declare const _default: AgentController;
export default _default;
//# sourceMappingURL=AgentController.d.ts.map