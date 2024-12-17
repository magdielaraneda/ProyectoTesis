import Servicio from "../models/servicios.model.js";
import { servicioBodySchema } from "../schema/servicio.schema.js";

export const getServicios = async (req, res) => {
  const { categoria } = req.query;
  try {
    const query = categoria ? { categoria } : {};
    const servicios = await Servicio.find(query).select('nombre categoria precio description');
    if (servicios.length === 0) {
      return res.status(404).json({ message: "No se encontraron servicios" });
    }
    res.json(servicios);
  } catch (error) {
    console.error(`[GET /servicios] Error: ${error.message}`);
    res.status(500).json({ error: "Error al obtener los servicios", details: error.message });
  }
};

export const createServicio = async (req, res) => {
  const { error } = servicioBodySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message),
    });
  }

  const { nombre, categoria, description, precio, subServicios } = req.body;

  try {
    const nuevoServicio = new Servicio({
      nombre,
      categoria,
      description,
      precio,
      subServicios,
    });
    await nuevoServicio.save();
    res.status(201).json({
      message: "Servicio creado con éxito",
      servicio: nuevoServicio,
    });
  } catch (error) {
    console.error(`[POST /servicios] Error: ${error.message}`);
    res.status(500).json({ error: "Error al crear el servicio", details: error.message });
  }
};

export const getServicioById = async (req, res) => {
  const { id } = req.params;
  try {
    const servicio = await Servicio.findById(id);
    if (!servicio) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(servicio);
  } catch (error) {
    console.error(`[GET /servicios/:id] Error: ${error.message}`);
    res.status(500).json({ error: "Error al obtener el servicio", details: error.message });
  }
};

export const updateServicio = async (req, res) => {
  const { id } = req.params;
  const { error } = servicioBodySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map((detail) => detail.message) });
  }

  const { nombre, categoria, description, precio, subServicios } = req.body;
  try {
    const servicioActualizado = await Servicio.findByIdAndUpdate(
      id,
      { nombre, categoria, description, precio, subServicios },
      { new: true }
    );
    if (!servicioActualizado) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio actualizado con éxito", servicio: servicioActualizado });
  } catch (error) {
    console.error(`[PUT /servicios/:id] Error: ${error.message}`);
    res.status(500).json({ error: "Error al actualizar el servicio", details: error.message });
  }
};

export const deleteServicio = async (req, res) => {
  const { id } = req.params;
  try {
    const servicioEliminado = await Servicio.findByIdAndDelete(id);
    if (!servicioEliminado) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio eliminado con éxito" });
  } catch (error) {
    console.error(`[DELETE /servicios/:id] Error: ${error.message}`);
    res.status(500).json({ error: "Error al eliminar el servicio", details: error.message });
  }
};
