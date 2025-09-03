import {Router} from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import { authMiddleware } from "../middleware/authMiddleware";
import systemRouter from "./system.routes";   
import streamRouter from "./stream.route";
import alertRouter from "./alerts.route";
import { startSystemWatcher } from "../controllers/AlertController";
import integrationsRouter from "./integrations.routes";
const routers = Router();

routers.get("/",(req, res)=>{
    res.status(200).json("APi SmartQuote ON...");
});

startSystemWatcher();
routers.use("/stream", streamRouter);
routers.use("/auth", authRouter);
routers.use("/alerts", alertRouter);
routers.use("/integrations", integrationsRouter);
routers.use("/users",authMiddleware, userRouter);
routers.use("/systems",authMiddleware, systemRouter);


export default routers;

 