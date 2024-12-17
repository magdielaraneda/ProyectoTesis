"use strict";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isAdmin(req, res, next) {
  await verificarRol(req, res, next, "admin");
}

async function isGerente(req, res, next) {
  await verificarRol(req, res, next, "gerente");
}

async function esColaborador(req, res, next) {
  await verificarRol(req, res, next, "colaborador");
}

async function esCliente(req, res, next) {
  await verificarRol(req, res, next, "cliente");
}

/**
 * Función genérica para comprobar si el usuario tiene un rol específico
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 * @param {String} nombreRol - Nombre del rol a verificar
 */
async function verificarRol(req, res, next, nombreRol) {
  try {
    const user = await User.findById(req.user.id).populate("roles");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } });

    const tieneRol = roles.some((role) => role.name === nombreRol);

    if (!tieneRol) {
      return res.status(403).json({
        message: `Se requiere un rol de ${nombreRol} para realizar esta acción.`,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error en la autorización", details: error.message });
  }
}


export { isAdmin, isGerente, esColaborador, esCliente };
