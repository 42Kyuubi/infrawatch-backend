import { Router } from "express";
import systemController from "../controllers/SystemController";
import TypeSystemController from "../controllers/TypeSystemController";

const systemRouter = Router();

systemRouter.get("/", systemController.getAll);
systemRouter.post("/", systemController.create);
systemRouter.get("/:id",systemController.getById);
systemRouter.delete("/:id", systemController.delete);
systemRouter.patch("/:id", systemController.patch);

systemRouter.get("/type/all", TypeSystemController.getAll);
systemRouter.post("/type/create", TypeSystemController.create);
systemRouter.get("/type/:id",TypeSystemController.getById);
systemRouter.delete("/type/delete/:id", TypeSystemController.delete);
systemRouter.patch("/type/update/:id", TypeSystemController.patch);


export default systemRouter;