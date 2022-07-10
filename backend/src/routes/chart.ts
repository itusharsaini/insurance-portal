import { Router } from "express";
import { getChartDataController } from "../controllers/chart/getChartDataController";

const router = Router();

router.route("/").get(getChartDataController)

export default router;
