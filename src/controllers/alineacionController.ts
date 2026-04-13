import type { Request, Response } from "express";
import * as alineacionModel from "../models/AlienacionModel.js";

export const handleSaveAlineacion = async (req: Request, res: Response) => {
  try {
    const { nombre_tactica, esquema_json } = req.body;

    // Rescatamos el ID del token (inyectado por el middleware)
    const user_id = (req as any).user.id;

    if (!nombre_tactica || !esquema_json) {
      return res.status(400).json({ error: "Faltan datos de la táctica" });
    }

    const nuevaAlineacion = await alineacionModel.saveAlineacion({
      user_id,
      nombre_tactica,
      esquema_json,
    });

    res.status(201).json({ success: true, data: nuevaAlineacion });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const handleGetAlineaciones = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user.id;
    const alineaciones = await alineacionModel.getAlineacionesByUser(user_id);
    res.json({ success: true, data: alineaciones });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
