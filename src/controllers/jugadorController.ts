import type { Request, Response } from "express";
import * as jugadoresModel from "../models/JugadorModel.js";

export const handleGetAllJugadores = async (req: Request, res: Response) => {
  try {
    const jugadores = await jugadoresModel.getAllJugadoresConEstadisticas();
    res.json({ success: true, data: jugadores });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const handleCompararJugadores = async (req: Request, res: Response) => {
  try {
    const { id1, id2 } = req.body;
    const [j1, j2] = await Promise.all([
      jugadoresModel.getJugadorConEstadisticas(id1),
      jugadoresModel.getJugadorConEstadisticas(id2),
    ]);

    if (!j1 || !j2)
      return res.status(404).json({ error: "Jugador no encontrado" });

    res.json({ success: true, data: { jugador1: j1, jugador2: j2 } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
