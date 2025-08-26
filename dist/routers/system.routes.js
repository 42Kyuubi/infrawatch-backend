"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SystemController_1 = __importDefault(require("../controllers/SystemController"));
const TypeSystemController_1 = __importDefault(require("../controllers/TypeSystemController"));
const permissionMiddleware_1 = require("../middleware/permissionMiddleware");
const systemRouter = (0, express_1.Router)();
systemRouter.get("/", SystemController_1.default.getAll);
systemRouter.post("/", permissionMiddleware_1.permissionMiddleware, SystemController_1.default.create);
systemRouter.get("/:id", SystemController_1.default.getById);
systemRouter.delete("/:id", permissionMiddleware_1.permissionMiddleware, SystemController_1.default.delete);
systemRouter.patch("/:id", permissionMiddleware_1.permissionMiddleware, SystemController_1.default.patch);
systemRouter.get("/type/all", TypeSystemController_1.default.getAll);
systemRouter.post("/type/create", permissionMiddleware_1.permissionMiddleware, TypeSystemController_1.default.create);
systemRouter.get("/type/:id", TypeSystemController_1.default.getById);
systemRouter.delete("/type/delete/:id", permissionMiddleware_1.permissionMiddleware, TypeSystemController_1.default.delete);
systemRouter.patch("/type/update/:id", permissionMiddleware_1.permissionMiddleware, TypeSystemController_1.default.patch);
exports.default = systemRouter;
//# sourceMappingURL=system.routes.js.map