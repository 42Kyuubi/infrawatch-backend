import  dotenv from "dotenv";
dotenv.config();
import express from "express"; 
import { startScheduler } from "./infra/polling";

const app = express(); 
startScheduler();
app.listen(2001, ()=>console.log(`Polling running in port=2001`));