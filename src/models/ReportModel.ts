import { pool } from "../config/db.js";

export interface IReporteTecnico {
  id?: string;
  jugador_id: number;
  contenido: string;
  categoria: string;
  fecha_reporte?: string;
}

export const createReporte = async (reporte: IReporteTecnico) => {
  const query = `
    INSERT INTO reportes_tecnicos (jugador_id, contenido, categoria, fecha_reporte)
    VALUES ($1, $2, $3, COALESCE($4, CURRENT_DATE))
    RETURNING *;
  `;
  const values = [
    reporte.jugador_id,
    reporte.contenido,
    reporte.categoria,
    reporte.fecha_reporte,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};
