import { Router } from "express";
import { getPoliciesByIdController, getPoliciesDataController } from "../controllers/policies/getPoliciesController";
import { insertPoliciesController } from "../controllers/policies/insertPoliciesController";

const router = Router();

router.route("/").get(getPoliciesDataController).post(insertPoliciesController);
router.route("/:insuranceId").get(getPoliciesByIdController).post()

export default router;
