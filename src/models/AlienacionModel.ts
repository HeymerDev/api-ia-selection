import { pool } from "../config/db.js";

export interface IPosicionJugador {
  jugador_id: number | string;
  nombre: string;
  foto: string;
  x: number; // Coordenada en el lienzo/campo
  y: number; // Coordenada en el lienzo/campo
  rol?: string; // Ej: 'DC', 'MCO', 'LI'
}

export interface IAlineacion {
  user_id: string;
  nombre_tactica: string;
  esquema_json: {
    formacion: string; // Ej: '4-3-3'
    posiciones: IPosicionJugador[];
  };
}

export const saveAlineacion = async (data: IAlineacion) => {
  const query = `
    INSERT INTO alineaciones (user_id, nombre_tactica, esquema_json)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    data.user_id,
    data.nombre_tactica,
    data.esquema_json,
  ]);
  return rows[0];
};

export const getAlineacionesByUser = async (userId: string) => {
  const { rows } = await pool.query(
    "SELECT * FROM alineaciones WHERE user_id = $1 ORDER BY created_at DESC",
    [userId],
  );
  return rows;
};
