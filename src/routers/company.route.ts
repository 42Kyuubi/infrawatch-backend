import {Router} from "express";
import userController from "../controllers/UserController";
import { permissionAdminMiddleware } from "../middleware/permissionMiddleware";

const userRouter = Router();

userRouter.get("/:id",userController.getById);
userRouter.patch("/:id",permissionAdminMiddleware, userController.patch);

export default userRouter;