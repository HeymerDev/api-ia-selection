import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usuarioModel from "../models/UserModel.js";

const SECRET_KEY = process.env.JWT_SECRET || "tu_clave_secreta_super_segura";

export const registrarUsuario = async (
  nombre: string,
  email: string,
  pass: string,
  rol: string,
) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(pass, saltRounds);

  return await usuarioModel.createUsuario({
    nombre,
    email,
    password_hash: hash,
    rol,
  });
};

export const loginUsuario = async (email: string, pass: string) => {
  const usuario = await usuarioModel.findUsuarioByEmail(email);
  if (!usuario) throw new Error("Usuario no encontrado");

  const match = await bcrypt.compare(pass, usuario.password_hash);
  if (!match) throw new Error("Contraseña incorrecta");

  // Generar Token
  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET_KEY, {
    expiresIn: "8h",
  });

  return {
    token,
    usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
  };
};
