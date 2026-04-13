import { Router } from "express";
import * as authService from "../services/authService.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const user = await authService.registrarUsuario(
      nombre,
      email,
      password,
      rol || "usuario",
    );
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUsuario(email, password);
    res.json(data);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
