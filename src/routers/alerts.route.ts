import {Router} from "express";
import AlertController from "../controllers/AlertController"; 

const alertRouter = Router();

alertRouter.get('/', AlertController.getAll);

export default alertRouter;