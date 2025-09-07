"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrationsAgentRouter = exports.integrationsRouter = void 0;
const express_1 = require("express");
const IntegrationController_1 = __importDefault(require("../controllers/IntegrationController"));
const AgentController_1 = __importDefault(require("../controllers/AgentController"));
const TypeSystemController_1 = __importDefault(require("../controllers/TypeSystemController"));
const integrationsRouter = (0, express_1.Router)();
exports.integrationsRouter = integrationsRouter;
integrationsRouter.get("/", IntegrationController_1.default.getAll);
integrationsRouter.post("/", IntegrationController_1.default.create);
integrationsRouter.delete("/:id", IntegrationController_1.default.delete);
const integrationsAgentRouter = (0, express_1.Router)();
exports.integrationsAgentRouter = integrationsAgentRouter;
integrationsAgentRouter.post("/", AgentController_1.default.validationAgent);
integrationsAgentRouter.get("/:agent/systems", AgentController_1.default.getSystemAllByAgent);
integrationsAgentRouter.post("/:agent/systems", AgentController_1.default.createAgentSystem);
integrationsAgentRouter.get("/:agent/systems/types", TypeSystemController_1.default.getAll);
integrationsAgentRouter.patch("/:agent/metrics", AgentController_1.default.createAgentMetrics);
//# sourceMappingURL=integrations.routes.js.map