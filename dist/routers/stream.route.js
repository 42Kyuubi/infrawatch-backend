"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StreamController_1 = __importDefault(require("../controllers/StreamController"));
const streamRouter = (0, express_1.Router)();
streamRouter.get("/systems", StreamController_1.default.streamSystemsWithMetrics);
streamRouter.get("/metrcis", StreamController_1.default.streamMetricsAll);
exports.default = streamRouter;
//# sourceMappingURL=stream.route.js.map