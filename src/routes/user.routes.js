"use strict";
import { Router } from "express";
import { getUsers, deleteUser, obtenerColaboradores } from "../controllers/user.controller.js";
import {
  isAdmin,
  isGerente,
  esColaborador,
  esCliente,
} from "../middlewares/authorization.middleware.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { createUsers } from "../config/initialSetup.js";


const router = Router();

router.use(authenticationMiddleware);
router.get("/", isAdmin, getUsers);
router.post("/", isAdmin, createUsers);
router.put("/users/:id", isAdmin, (req, res) => {
  res.json({ message: "Usuario actualizado" });
});
router.delete("/:id", isAdmin, deleteUser);
router.get("/colaboradores", isGerente, obtenerColaboradores);
router.get("/:id", (req, res) => {
  res.json({ message: `Datos del usuario ${req.params.id}` });
});
router.get("/notificaciones", esColaborador, (req, res) => {
  res.json({ message: "Notificaciones del usuario" });
});
router.get("/gerentes", isGerente, (req, res) => {
  res.json({ message: "Bienvenido, gerente" });
});
router.get("/clientes", esCliente, (req, res) => {
  res.json({ message: "Bienvenido, cliente" });
});

export default router;
