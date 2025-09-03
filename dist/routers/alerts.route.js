"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AlertController_1 = __importDefault(require("../controllers/AlertController"));
const alertRouter = (0, express_1.Router)();
alertRouter.get('/', AlertController_1.default.getAll);
exports.default = alertRouter;
//# sourceMappingURL=alerts.route.js.map