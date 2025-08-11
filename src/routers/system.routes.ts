import { Router } from "express";
import systemController from "../controllers/system.controller";

const systemRouter = Router();

systemRouter.get("/", systemController.getAll);

systemRouter.post("/", systemController.create);

systemRouter.get("/:id",systemController.getById);

systemRouter.delete("/", systemController.delete);

systemRouter.patch("/", systemController.patch);

export default systemRouter;