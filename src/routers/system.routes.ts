import { Router } from "express";
import systemController from "../controllers/SystemController";
import TypeSystemController from "../controllers/TypeSystemController";
import { permissionMiddleware } from "../middleware/permissionMiddleware";

const systemRouter = Router();


systemRouter.get("/", systemController.getAll);
systemRouter.post("/",permissionMiddleware, systemController.create);
systemRouter.get("/:id",systemController.getById);
systemRouter.delete("/:id",permissionMiddleware, systemController.delete);
systemRouter.patch("/:id",permissionMiddleware, systemController.patch);

systemRouter.get("/type/all", TypeSystemController.getAll);
systemRouter.post("/type/create",permissionMiddleware, TypeSystemController.create);
systemRouter.get("/type/:id",TypeSystemController.getById);
systemRouter.delete("/type/delete/:id",permissionMiddleware, TypeSystemController.delete);
systemRouter.patch("/type/update/:id",permissionMiddleware, TypeSystemController.patch);


export default systemRouter;