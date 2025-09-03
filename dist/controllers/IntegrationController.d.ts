import { Request, Response } from 'express';
declare class IntegrationController {
    validationAgent(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    getAll(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
    patch(req: Request, res: Response): Promise<Response>;
}
declare const _default: IntegrationController;
export default _default;
//# sourceMappingURL=IntegrationController.d.ts.map