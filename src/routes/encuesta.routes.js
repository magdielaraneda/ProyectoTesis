import express from 'express';
import { enviarEncuesta, getEncuestas, eliminarEncuesta, getEncuestasByColaborador } from '../controllers/encuesta.controller.js';
import { isAdmin, isGerente } from '../middlewares/authorization.middleware.js';

const router = express.Router();

router.post('/', enviarEncuesta);
router.get('/:id?', getEncuestas);
router.get('/buscar/colaborador', getEncuestasByColaborador);
router.delete('/:id', [isGerente, isAdmin], eliminarEncuesta);

export default router;
