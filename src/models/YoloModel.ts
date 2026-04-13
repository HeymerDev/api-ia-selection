import { pool } from "../config/db.js";

export interface IAnalisisYolo {
  user_id: string;
  video_url: string;
  heatmap_url: string;
}

export const createAnalisis = async (data: IAnalisisYolo) => {
  const query = `
    INSERT INTO analisis_yolo (user_id, video_url, heatmap_url, fecha_proceso)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const values = [data.user_id, data.video_url, data.heatmap_url];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
