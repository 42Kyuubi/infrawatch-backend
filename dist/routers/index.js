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
const GLPIRoute_1 = __importDefault(require("./glpi/GLPIRoute"));
const routers = (0, express_1.Router)();
routers.get("/", (req, res) => {
    res.status(200).json("APi SmartQuote ON...");
});
routers.use("/auth", auth_route_1.default);
routers.use("/users", authMiddleware_1.authMiddleware, user_route_1.default);
routers.use("/systems", authMiddleware_1.authMiddleware, system_routes_1.default);
routers.use("/glpi", GLPIRoute_1.default);
exports.default = routers;
//# sourceMappingURL=index.js.map