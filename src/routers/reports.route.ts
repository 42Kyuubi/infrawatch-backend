import {Router} from "express"; 
import ReportsController from "../controllers/ReportsController";

const reportsRouter = Router();

reportsRouter.get("/", ReportsController.getAll); 

export default reportsRouter;