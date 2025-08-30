"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const port = process.env.PORT_DEFAULT || 2001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", routers_1.default);
app.listen(port, () => console.log(`Server running in port=${port}`));
//# sourceMappingURL=server.js.map