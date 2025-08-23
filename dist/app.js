"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const polling_1 = require("./infra/polling");
const app = (0, express_1.default)();
(0, polling_1.startScheduler)();
app.listen(2001, () => console.log(`Polling running in port=2001`));
//# sourceMappingURL=app.js.map