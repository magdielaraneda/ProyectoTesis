import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ReporteSchema = new Schema(
  {
    reservacionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservacion',
      required: true,
    },
    horaInicio: {
      type: Date,
      required: true,
    },
    horaTermino: {
      type: Date,
      required: true,
    },
    tipoServicio: {
      type: String,
      required: true,
      trim: true,
    },
    observacionesIniciales: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    fotosAntes: [String],
    fotosDespues: [String],
    recomendaciones: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    observacionesCliente: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    firmaCliente: {
      type: String,
      trim: true,
    },
    encuestaEnviada: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Reporte', ReporteSchema);
