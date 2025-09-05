import {Router} from "express";
import integrationController from "../controllers/IntegrationController";
import AgentController from "../controllers/AgentController";

const integrationsRouter = Router();

integrationsRouter.get("/",integrationController.getAll);
integrationsRouter.post("/",integrationController.create);
integrationsRouter.delete("/:id",integrationController.delete);

const integrationsAgentRouter = Router();
integrationsAgentRouter.post("/",AgentController.validationAgent); 
integrationsAgentRouter.get("/:agent/systems",AgentController.getSystemAllByAgent); 
integrationsAgentRouter.post("/:agent/systems",AgentController.createAgentSystem); 

export {integrationsRouter,integrationsAgentRouter} ;