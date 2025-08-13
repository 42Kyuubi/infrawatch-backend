"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const employeeRouter = (0, express_1.Router)();
employeeRouter.get("/", employee_controller_1.default.getAll);
employeeRouter.post("/create", employee_controller_1.default.create);
exports.default = employeeRouter;
//# sourceMappingURL=employee.route.js.map