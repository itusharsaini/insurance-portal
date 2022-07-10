import { Router } from "express";
import multer from "multer";
import { seedController } from "../controllers/seed/seedController";

let upload = multer({storage: multer.memoryStorage()});
const router = Router();

router.route("/").post(upload.single('file'), seedController);

export default router;
