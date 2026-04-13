import axios from "axios";
import FormData from "form-data";
import * as yoloModel from "../models/YoloModel.js";

export const procesarAnalisisCompleto = async (
  userId: string,
  videoBuffer: Buffer,
  fileName: string,
) => {
  // 1. Preparamos el sobre (FormData) para FastAPI
  const form = new FormData();
  // El campo debe llamarse 'file' para coincidir con tu FastAPI
  form.append("file", videoBuffer, {
    filename: fileName,
    contentType: "video/mp4",
  });

  // 2. Petición al microservicio de Python
  const fastApiResponse = await axios.post(
    "http://localhost:8000/analyze-training",
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
    },
  );

  const { heatmap_url, status } = fastApiResponse.data;

  if (status !== "success") {
    throw new Error("El procesamiento en FastAPI falló");
  }

  // 3. Guardamos en la base de datos PostgreSQL
  return await yoloModel.createAnalisis({
    user_id: userId,
    video_url: `uploads/${fileName}`, // O la URL que decidas para el video original
    heatmap_url: heatmap_url, // URL estática (http://localhost:8000/static/...)WWS
  });
};
