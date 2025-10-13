import { Request, Response, NextFunction } from 'express'; 

 async function permissionMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === "viewer") {
    return res.status(401).json({ message: 'Acesso Negado!  Não tens permissão' });
  }
  next();
}

 async function permissionAdminMiddleware(req: Request, res: Response, next: NextFunction) {


  
  if (req.user?.role != "admin") {
    console.log(req.user);
    return res.status(401).json({ message: 'Acesso Negado!  Não tens permissão' });
  }
  next();
}

export {permissionMiddleware,permissionAdminMiddleware};