import {Router} from "express"; 
import StreamController from "../controllers/StreamController";

const streamRouter = Router();

streamRouter.get("/systems", StreamController.streamSystemsWithMetrics);
streamRouter.get("/metrcis", StreamController.streamMetricsAll);

export default streamRouter;