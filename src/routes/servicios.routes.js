import express from 'express';
import {
  getServicios,
  createServicio,
  getServicioById,
  updateServicio,
  deleteServicio,
} from '../controllers/servicios.controller.js';
import verifyJWT from '../middlewares/authentication.middleware.js';
import { isAdmin } from '../middlewares/authorization.middleware.js';

const router = express.Router();

router.get('/', getServicios);
router.use(verifyJWT);
router.post("/", isAdmin, createServicio);
router.get("/:id", getServicioById);
router.put("/:id", isAdmin, updateServicio);
router.delete("/:id", isAdmin, deleteServicio);

export default router;
