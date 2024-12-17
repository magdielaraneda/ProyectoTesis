import mongoose from 'mongoose';

const { Schema, model } = mongoose; 

const ReservacionSchema = new Schema({
  servicioId: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true },
  horario: { type: Date, required: true },
  clienteNombre: { type: String, required: true },
  clienteEmail: { type: String, required: true },
  clienteTelefono: { type: String, required: true },
  direccionCliente: { type: String, required: true },
  observaciones: { type: String },
  precio: { type: Number, required: true },
  estado: {
    type: String,
    enum: ["pendiente", "asignado", "completado"],
    default: "pendiente",
  },
  colaboradorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nombreServicio: { type: String, required: true },
  categoria: { type: String, required: true },
  reporteId: { type: mongoose.Schema.Types.ObjectId, ref: "Reporte" },
});

export default model("Reservacion", ReservacionSchema);
