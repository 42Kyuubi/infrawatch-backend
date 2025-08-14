import {Router} from "express";
import userController from "../controllers/UserController";

const userRouter = Router();

userRouter.get("/",userController.getAll);
userRouter.get("/:id",userController.getById);
userRouter.post("/create",userController.create);
userRouter.delete("/:id",userController.delete);
userRouter.patch("/:id",userController.patch);

export default userRouter;
