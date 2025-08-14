import {Router} from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import { authMiddleware } from "../middleware/authMiddleware";
import systemRouter from "./system.routes";
import snmpRoute from "./snmp/snmpRoute";

const routers = Router();

routers.get("/",(req, res)=>{
    res.status(200).json("APi SmartQuote ON...");
});
routers.use("/auth", authRouter);
routers.use("/users",authMiddleware, userRouter);
routers.use("/systems",authMiddleware, systemRouter);
routers.use("/snmp", snmpRoute);

export default routers;
