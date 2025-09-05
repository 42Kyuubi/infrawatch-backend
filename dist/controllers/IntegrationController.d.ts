import { Request, Response } from 'express';
declare class IntegrationController {
    create(req: Request, res: Response): Promise<Response>;
    getAll(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
}
declare const _default: IntegrationController;
export default _default;
//# sourceMappingURL=IntegrationController.d.ts.map