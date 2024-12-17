import Reservacion from "../models/reservas.model.js";
import User from "../models/user.model.js";
import Servicio from "../models/servicios.model.js";
import Role from "../models/role.model.js";
import { reservacionBodySchema } from "../schema/reserva.schema.js";
import { sendEmail } from "../utils/mailer.js";
import mongoose from "mongoose";
import { io } from "../index.js";

export const crearReservacion = async (req, res) => {
  const { error } = reservacionBodySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map((detail) => detail.message) });
  }

  const { servicioId, horario, clienteNombre, clienteEmail, clienteTelefono, direccionCliente, observaciones } = req.body;

  try {
    const servicio = await Servicio.findById(servicioId);
    if (!servicio) {
      return res.status(404).json({ error: "El servicio solicitado no existe" });
    }

    const existenReservaciones = await Reservacion.find({
      servicioId,
      horario: new Date(horario),
    });

    if (existenReservaciones.length > 0) {
      return res.status(400).json({ error: "El servicio no está disponible en este horario" });
    }

    const reservacion = new Reservacion({
      servicioId,
      horario: new Date(horario),
      clienteNombre,
      clienteEmail,
      clienteTelefono,
      direccionCliente,
      observaciones,
      precio: servicio.precio,
      nombreServicio: servicio.nombre,
      categoria: servicio.categoria,
      estado: "pendiente",
    });

    await reservacion.save();

    // Enviar correo al cliente
    const emailSubject = "Reserva Creada";
    const emailText = `Hola ${clienteNombre}, tu reserva para el servicio "${servicio.nombre}" ha sido creada y está pendiente de asignación de colaborador.`;
    const emailHtml = `
      <h1>Reserva Creada</h1>
      <p>Hola <strong>${clienteNombre}</strong>,</p>
      <p>Tu reserva para el servicio <strong>"${servicio.nombre}"</strong> ha sido creada y está pendiente de asignación de colaborador.</p>
      <p><strong>Detalles de la Reserva:</strong></p>
      <ul>
        <li><strong>Fecha y hora:</strong> ${new Date(horario).toLocaleString()}</li>
        <li><strong>Dirección:</strong> ${direccionCliente}</li>
        <li><strong>Precio:</strong> $${servicio.precio.toFixed(2)}</li>
      </ul>
      <p>Gracias por confiar en nosotros.</p>
    `;

    await sendEmail(clienteEmail, emailSubject, emailText, emailHtml);

    res.status(201).json({ message: "Reserva creada y pendiente de asignación.", reservacion });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

export const asignarColaborador = async (req, res) => {
  const { reservacionId, colaboradorId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(reservacionId) || !mongoose.Types.ObjectId.isValid(colaboradorId)) {
      return res.status(400).json({ state: "Error", message: "IDs inválidos" });
    }

    const reservacion = await Reservacion.findById(reservacionId);
    if (!reservacion) {
      return res.status(404).json({ state: "Error", message: "Reservación no encontrada" });
    }

    if (reservacion.estado !== "pendiente") {
      return res.status(400).json({ state: "Error", message: "La reservación ya fue procesada" });
    }

    const colaborador = await User.findById(colaboradorId).populate("roles");
    if (!colaborador) {
      return res.status(404).json({ state: "Error", message: "Colaborador no encontrado" });
    }

    const colaboradorRole = await Role.findOne({ name: "colaborador" });
    if (!colaboradorRole) {
      return res.status(500).json({
        state: "Error",
        message: "Rol 'colaborador' no encontrado en la base de datos",
      });
    }

    if (!colaborador.roles.some((role) => role.equals(colaboradorRole._id))) {
      return res.status(400).json({ state: "Error", message: "El usuario no es un colaborador válido" });
    }

    reservacion.colaboradorId = colaboradorId;
    reservacion.estado = "asignado";

    colaborador.notifications.push({
      reservacionId,
      mensaje: `Se te ha asignado una nueva reservación para el servicio ${reservacion.nombreServicio}.`,
    });

    await Promise.all([reservacion.save(), colaborador.save()]);

    io.to(colaboradorId).emit("notification", {
      mensaje: `Se te ha asignado una nueva reservación: ${reservacion.nombreServicio}`,
      reservacion,
    });

    res.status(200).json({ state: "Success", message: "Colaborador asignado exitosamente", reservacion });
  } catch (error) {
    res.status(500).json({ state: "Error", message: "Error al asignar colaborador", details: error.message });
  }
};

export const obtenerReservacionesAgrupadasPorFechaYCategoria = async (req, res) => {
  try {
    const reservaciones = await Reservacion.aggregate([
      {
        $lookup: {
          from: "servicios",
          localField: "servicioId",
          foreignField: "_id",
          as: "servicioInfo",
        },
      },
      { $unwind: "$servicioInfo" },
      {
        $group: {
          _id: {
            fecha: { $dateToString: { format: "%Y-%m-%d", date: "$horario" } },
            categoria: "$servicioInfo.categoria",
          },
          reservas: {
            $push: {
              _id: "$_id",
              horario: "$horario",
              clienteNombre: "$clienteNombre",
              estado: "$estado",
              nombreServicio: "$servicioInfo.nombre",
              reporteId: "$reporteId",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.fecha",
          categorias: { $push: { categoria: "$_id.categoria", reservas: "$reservas" } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(reservaciones);
  } catch (error) {
    console.error("Error al obtener reservas agrupadas:", error.message);
    res.status(500).json({ error: "Error al obtener reservas agrupadas." });
  }
};

export const obtenerReservasPorColaborador = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "El ID del colaborador no es válido." });
  }

  if (req.user.id !== id && !req.user.roles.includes('gerente')) {
    return res.status(403).json({ error: "No tienes permiso para acceder a estas reservaciones." });
  }

  try {
    const reservas = await Reservacion.find({ colaboradorId: id }).populate("servicioId", "nombre categoria precio");
    if (!reservas || reservas.length === 0) {
      return res.status(404).json({ message: "No se encontraron reservaciones." });
    }
    res.json(reservas);
  } catch (error) {
    console.error("Error al obtener reservaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerReservacionPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const reservacion = await Reservacion.findById(id).populate("servicioId");
    if (!reservacion) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }

    res.json(reservacion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reservación", details: error.message });
  }
};

export const eliminarReservacion = async (req, res) => {
  const { id } = req.params;

  try {
    const reservacion = await Reservacion.findByIdAndDelete(id);
    if (!reservacion) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.json({ message: "Reserva eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
};
