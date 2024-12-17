import express from "express";
import {
  crearReporte,
  obtenerReportePorId,
  actualizarReporteServicio,
  obtenerReportesCompletados,
  eliminarReporte,
} from "../controllers/reporte.controller.js";
import { esColaborador, isGerente } from "../middlewares/authorization.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/",
  esColaborador,
  upload.fields([{ name: "fotosAntes" }, { name: "fotosDespues" }]),
  crearReporte
);
router.get("/:id", isGerente, obtenerReportePorId);
router.put("/:id", esColaborador, actualizarReporteServicio);
router.get("/completados", isGerente, obtenerReportesCompletados);
router.delete("/:id", isGerente, eliminarReporte);

export default router;
