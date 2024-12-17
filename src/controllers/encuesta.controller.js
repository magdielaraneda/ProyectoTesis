import Encuesta from "../models/encuesta.model.js";
import User from "../models/user.model.js";
import { encuestaBodySchema } from "../schema/encuesta.schema.js";


export const enviarEncuesta = async (req, res) => {
  const { error } = encuestaBodySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map((detail) => detail.message) });
  }

  const { reservacionId, clasificacion, comentario } = req.body;

  try {
    const nuevaEncuesta = new Encuesta({ reservacionId, clasificacion, comentario });
    await nuevaEncuesta.save();

    res.status(201).json({ message: "Encuesta enviada con éxito", encuesta: nuevaEncuesta });
  } catch (error) {
    res.status(500).json({ error: "Error al enviar la encuesta", details: error.message });
  }
};

export const getEncuestas = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const encuesta = await Encuesta.findById(id)
        .populate("reservacionId", "colaboradorId servicioId");

      if (!encuesta) return res.status(404).json({ error: "Encuesta no encontrada" });

      return res.json(encuesta);
    }

    const encuestas = await Encuesta.find().populate("reservacionId", "colaboradorId servicioId");
    res.json(encuestas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener encuestas", details: error.message });
  }
};

export const getEncuestasByColaborador = async (req, res) => {
  const { username } = req.query;

  try {
    const colaborador = await User.findOne({ username });
    if (!colaborador) {
      return res.status(404).json({ error: "Colaborador no encontrado" });
    }

    const encuestas = await Encuesta.find()
      .populate({
        path: "reservacionId",
        match: { colaboradorId: colaborador._id },
        populate: { path: "colaboradorId", select: "username" },
      });

    const encuestasFiltradas = encuestas.filter((encuesta) => encuesta.reservacionId);

    res.json(encuestasFiltradas);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar encuestas por colaborador", details: error.message });
  }
};

export const eliminarEncuesta = async (req, res) => {
  const { id } = req.params;

  try {
    const encuestaEliminada = await Encuesta.findByIdAndDelete(id);
    if (!encuestaEliminada) return res.status(404).json({ error: "Encuesta no encontrada" });

    res.json({ message: "Encuesta eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la encuesta", details: error.message });
  }
};
