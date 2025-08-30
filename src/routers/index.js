"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const employee_route_1 = __importDefault(require("./employee.route"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const routers = (0, express_1.Router)();
routers.use("/auth", auth_route_1.default);
routers.use("/employee", authMiddleware_1.authMiddleware, employee_route_1.default);
exports.default = routers;
//# sourceMappingURL=index.js.map