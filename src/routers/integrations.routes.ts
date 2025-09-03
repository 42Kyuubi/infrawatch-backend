import {Router} from "express";
import integrationController from "../controllers/IntegrationController";

const integrationsRouter = Router();

integrationsRouter.post("/agents",integrationController.validationAgent); 
integrationsRouter.get("/",integrationController.getAll);
integrationsRouter.post("/",integrationController.create);


export default integrationsRouter;