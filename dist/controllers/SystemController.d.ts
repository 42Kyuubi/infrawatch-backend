import { Request, Response } from 'express';
declare class SystemController {
    create(req: Request, res: Response): Promise<Response>;
    getAll(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    streamAll(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<Response>;
    patch(req: Request, res: Response): Promise<Response>;
}
declare const _default: SystemController;
export default _default;
//# sourceMappingURL=SystemController.d.ts.map