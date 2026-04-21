import { Router } from "express";
import {
  handleCompararJugadores,
  handleGetAllJugadores,
} from "../controllers/jugadorController.js";

const router: Router = Router();

// Si index.ts ya tiene "/api/jugadores", aquí las rutas deben ser relativas a eso:
router.get("/", handleGetAllJugadores); // Esto responde a /api/jugadores/
router.post("/comparar", handleCompararJugadores); // Esto responde a /api/jugadores/comparar

export default router;
