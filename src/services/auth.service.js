"use strict";

import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../config/env.config.js";
import { handleError } from "../utils/errorHandler.js";

export const generarToken = (user) => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    roles: Array.isArray(user.roles)
      ? user.roles.map((role) => role.name || role)
      : user.roles,
  };

  return jwt.sign(payload, ACCESS_JWT_SECRET, { expiresIn: "1h" });
};

async function login(user) {
  try {
    const { email, password } = user;

    const userFound = await User.findOne({ email: email })
      .populate("roles", "name")
      .exec();

    if (!userFound) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const matchPassword = await User.comparePassword(password, userFound.password);

    if (!matchPassword) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const accessToken = generarToken(userFound);
    const refreshToken = jwt.sign(
      {
        userId: userFound._id.toString(),
        email: userFound.email,
      },
      REFRESH_JWT_SECRET,
      { expiresIn: "7d" }
    );

    return [accessToken, refreshToken, null];
  } catch (error) {
    handleError(error, "auth.service -> login");
  }
}

async function refresh(cookies) {
  try {
    if (!cookies.jwt) return [null, "No hay autorización"];
    const refreshToken = cookies.jwt;

    const accessToken = await jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      async (err, user) => {
        if (err) return [null, "La sesión ha caducado, vuelva a iniciar sesión"];

        const userFound = await User.findOne({ email: user.email })
          .populate("roles", "name")
          .exec();

        if (!userFound) return [null, "Usuario no autorizado"];

        const newAccessToken = generarToken(userFound);

        return newAccessToken;
      }
    );

    return accessToken;
  } catch (error) {
    handleError(error, "auth.service -> refresh");
  }
}

export default { login, refresh, generarToken };
