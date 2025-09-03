"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IntegrationController_1 = __importDefault(require("../controllers/IntegrationController"));
const integrationsRouter = (0, express_1.Router)();
integrationsRouter.post("/agents", IntegrationController_1.default.validationAgent);
integrationsRouter.get("/", IntegrationController_1.default.getAll);
integrationsRouter.post("/", IntegrationController_1.default.create);
exports.default = integrationsRouter;
//# sourceMappingURL=integrations.routes.js.map