import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EncuestaSchema = new Schema({
  reservacionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservacion',
    required: true,
  },
  clasificacion: {  
    type: Number,
    required: true,
    min: 1,
    max: 7,
  },
  comentario: String,
});

export default model('Encuesta', EncuestaSchema);
