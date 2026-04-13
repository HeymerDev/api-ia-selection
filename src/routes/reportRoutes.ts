import { Router } from "express";
import {
  handleCreateReporte,
  handleGetReportes,
} from "../controllers/reportController.js";

const router = Router();

router.post("/", handleCreateReporte);
router.get("/", handleGetReportes);

export default router;
