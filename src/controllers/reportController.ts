import type { Request, Response } from "express";
import * as reporteService from "../services/reportService.js";

export const handleCreateReporte = async (req: Request, res: Response) => {
  try {
    const { jugador_id, contenido, categoria, fecha_reporte } = req.body;

    if (!jugador_id || !contenido || !categoria) {
      return res.status(400).json({
        success: false,
        error: "Faltan campos obligatorios: jugador_id, contenido o categoria",
      });
    }

    const nuevoReporte = await reporteService.registrarNuevoReporte({
      jugador_id,
      contenido,
      categoria,
      fecha_reporte,
    });

    res.status(201).json({
      success: true,
      data: nuevoReporte,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
