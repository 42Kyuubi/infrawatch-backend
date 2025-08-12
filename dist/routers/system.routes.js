"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SystemController_1 = __importDefault(require("../controllers/SystemController"));
const systemRouter = (0, express_1.Router)();
systemRouter.get("/", SystemController_1.default.getAll);
systemRouter.post("/", SystemController_1.default.create);
systemRouter.get("/:id", SystemController_1.default.getById);
systemRouter.delete("/", SystemController_1.default.delete);
systemRouter.patch("/", SystemController_1.default.patch);
exports.default = systemRouter;
//# sourceMappingURL=system.routes.js.map