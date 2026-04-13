import { pool } from "../config/db.js";

export interface IUsuario {
  id?: string;
  nombre: string;
  email: string;
  password_hash: string;
  rol: string;
}

export const createUsuario = async (u: IUsuario) => {
  const query = `
    INSERT INTO usuarios (nombre, email, password_hash, rol)
    VALUES ($1, $2, $3, $4)
    RETURNING id, nombre, email, rol, created_at;
  `;
  const { rows } = await pool.query(query, [
    u.nombre,
    u.email,
    u.password_hash,
    u.rol,
  ]);
  return rows[0];
};

export const findUsuarioByEmail = async (email: string) => {
  const { rows } = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);
  return rows[0];
};
