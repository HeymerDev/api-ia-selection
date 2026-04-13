import { Router } from "express";
import {
  handleCreateReporte,
  handleGetReportes,
} from "../controllers/reportController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(verificarToken); // Aplica el middleware de autenticación a todas las rutas de este router

router.post("/", handleCreateReporte);
router.get("/", handleGetReportes);

export default router;
