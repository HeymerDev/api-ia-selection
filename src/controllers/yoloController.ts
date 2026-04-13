import type { Request, Response } from "express";
import * as yoloService from "../services/yoloService.js";

export const handleVideoAnalysis = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user.id;
    const file = req.file; // Archivo subido vía Multer

    if (!file || !user_id) {
      return res.status(400).json({
        success: false,
        error: "Debes subir un video (mp4) y proporcionar el user_id",
      });
    }

    const resultado = await yoloService.procesarAnalisisCompleto(
      user_id,
      file.buffer,
      file.originalname,
    );

    res.status(201).json({
      success: true,
      data: resultado,
    });
  } catch (error: any) {
    console.error("Error en el controlador:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
