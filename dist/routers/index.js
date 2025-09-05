"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const system_routes_1 = __importDefault(require("./system.routes"));
const stream_route_1 = __importDefault(require("./stream.route"));
const alerts_route_1 = __importDefault(require("./alerts.route"));
const AlertController_1 = require("../controllers/AlertController");
const integrations_routes_1 = require("./integrations.routes");
const routers = (0, express_1.Router)();
routers.get("/", (req, res) => {
    res.status(200).json("APi SmartQuote ON...");
});
(0, AlertController_1.startSystemWatcher)();
routers.use("/stream", stream_route_1.default);
routers.use("/auth", auth_route_1.default);
routers.use("/alerts", alerts_route_1.default);
routers.use("/integrations/agents", integrations_routes_1.integrationsAgentRouter);
routers.use("/integrations", authMiddleware_1.authMiddleware, integrations_routes_1.integrationsRouter);
routers.use("/users", authMiddleware_1.authMiddleware, user_route_1.default);
routers.use("/systems", authMiddleware_1.authMiddleware, system_routes_1.default);
exports.default = routers;
//# sourceMappingURL=index.js.map