import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ServicioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    enum: ["prevención de riesgos", "estética", "limpieza"],
    required: true,
  },
  description: String,
  precio: {
    type: Number,
    required: true,
  },
  subServicios: [
    {
      nombre: String,
      precio: Number,
    },
  ],
});

export default model("Servicio", ServicioSchema);
