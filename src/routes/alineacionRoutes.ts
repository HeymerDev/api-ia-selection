import { Router } from "express";
import {
  handleSaveAlineacion,
  handleGetAlineaciones,
} from "../controllers/alineacionController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Aplicamos el middleware a nivel de router o a cada ruta
router.use(verificarToken);

router.post("/", handleSaveAlineacion);
router.get("/", handleGetAlineaciones);

export default router;
