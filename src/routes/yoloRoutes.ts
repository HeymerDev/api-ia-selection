import { Router } from "express";
import multer from "multer";
import { handleVideoAnalysis } from "../controllers/yoloController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Configuración de Multer: Guardamos en memoria (RAM) para reenvío rápido
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// El campo en el Body de Postman/Frontend debe ser 'video'
router.use(verificarToken);
router.post("/analizar", upload.single("video"), handleVideoAnalysis);

export default router;
