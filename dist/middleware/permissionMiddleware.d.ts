import { Request, Response, NextFunction } from 'express';
declare function permissionMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
declare function permissionAdminMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export { permissionMiddleware, permissionAdminMiddleware };
//# sourceMappingURL=permissionMiddleware.d.ts.map