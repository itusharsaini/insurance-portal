import { Router } from "express";
import { getPoliciesDataController } from "../controllers/policies/getPoliciesController";
import { insertPoliciesController } from "../controllers/policies/insertPoliciesController";

const router = Router();

router.route("/").get(getPoliciesDataController).post(insertPoliciesController);

export default router;
