import express from "express";
import {
  crearReservacion,
  obtenerReservacionesAgrupadasPorFechaYCategoria,
  eliminarReservacion,
  asignarColaborador,
  obtenerReservasPorColaborador,
  obtenerReservacionPorId
} from "../controllers/reservas.controller.js";
import verifyJWT from "../middlewares/authentication.middleware.js";
import { isGerente } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.post("/", crearReservacion);
router.get("/agrupadas", verifyJWT, obtenerReservacionesAgrupadasPorFechaYCategoria);
router.get("/colaborador/:id", verifyJWT, obtenerReservasPorColaborador);
router.get("/:id", verifyJWT, obtenerReservacionPorId);
router.patch("/asignar", verifyJWT, isGerente, asignarColaborador);
router.delete("/:id", verifyJWT, eliminarReservacion);

export default router;
