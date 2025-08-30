import {Router} from "express";
import userController from "../controllers/UserController";
import { permissionAdminMiddleware } from "../middleware/permissionMiddleware";

const userRouter = Router();

userRouter.get("/",userController.getAll);
userRouter.get("/:id",userController.getById);
userRouter.post("/create",permissionAdminMiddleware,userController.create);
userRouter.delete("/:id",permissionAdminMiddleware,userController.delete);
userRouter.patch("/:id",permissionAdminMiddleware, userController.patch);

export default userRouter;
