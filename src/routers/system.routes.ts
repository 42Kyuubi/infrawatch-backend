import { Router } from "express";
import systemController from "../controllers/SystemController";

const systemRouter = Router();

systemRouter.get("/", systemController.getAll);
systemRouter.post("/", systemController.create);
systemRouter.get("/:id",systemController.getById);
systemRouter.delete("/:id", systemController.delete);
systemRouter.patch("/:id", systemController.patch);

export default systemRouter;