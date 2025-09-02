import {Router} from "express"; 
import StreamController from "../controllers/StreamController";

const streamRouter = Router();

streamRouter.get("/systems", StreamController.streamSystemAll);

export default streamRouter;