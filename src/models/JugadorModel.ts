import { pool } from "../config/db.js";

export const getJugadorConEstadisticas = async (id: number | string) => {
  const query = `
    SELECT j.*, e.goles, e.asistencias, e.partidos_jugados, e.atajadas
    FROM jugadores j
    LEFT JOIN estadisticas e ON j.id_api = e.jugador_id
    WHERE j.id_api = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getAllJugadoresConEstadisticas = async () => {
  const query = `
    SELECT j.*, e.goles, e.asistencias, e.partidos_jugados, e.atajadas
    FROM jugadores j
    LEFT JOIN estadisticas e ON j.id_api = e.jugador_id
  `;
  const { rows } = await pool.query(query);
  return rows;
};
