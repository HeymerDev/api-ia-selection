import { Router } from "express";
import { handleCreateReporte } from "../controllers/reportController.js";

const router = Router();

router.post("/", handleCreateReporte);

export default router;
