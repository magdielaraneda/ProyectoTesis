import Joi from "joi";

const reporteBodySchema = Joi.object({
  reservacionId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "El ID de la reservación no puede estar vacío.",
      "any.required": "El ID de la reservación es obligatorio.",
      "string.pattern.base": "El ID de la reservación debe ser un ObjectId válido.",
    }),
  horaInicio: Joi.date().required().messages({
    "date.base": "La hora de inicio debe ser una fecha válida.",
    "any.required": "La hora de inicio es obligatoria.",
  }),
  horaTermino: Joi.date().required().messages({
    "date.base": "La hora de término debe ser una fecha válida.",
    "any.required": "La hora de término es obligatoria.",
  }),
  tipoServicio: Joi.string().required().messages({
    "string.empty": "El tipo de servicio no puede estar vacío.",
    "any.required": "El tipo de servicio es obligatorio.",
    "string.base": "El tipo de servicio debe ser una cadena de texto.",
  }),
  observacionesIniciales: Joi.string().allow("").messages({
    "string.base": "Las observaciones iniciales deben ser una cadena de texto.",
  }),
  fotosAntes: Joi.array()
    .items(Joi.string().uri().allow(""))
    .optional()
    .messages({
      "array.base": "Las fotos antes deben ser un arreglo de URLs.",
      "string.uri": "Cada foto antes debe ser una URL válida o vacío.",
    }),
  fotosDespues: Joi.array()
    .items(Joi.string().uri().allow(""))
    .optional()
    .messages({
      "array.base": "Las fotos después deben ser un arreglo de URLs.",
      "string.uri": "Cada foto después debe ser una URL válida o vacío.",
    }),
  recomendaciones: Joi.string().allow("").messages({
    "string.base": "Las recomendaciones deben ser una cadena de texto.",
  }),
  observacionesCliente: Joi.string().allow("").messages({
    "string.base": "Las observaciones del cliente deben ser una cadena de texto.",
  }),
  firmaCliente: Joi.string().uri().allow("").optional().messages({
    "string.base": "La firma del cliente debe ser una URL válida o vacía.",
    "string.uri": "La firma del cliente debe ser una URL válida.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export { reporteBodySchema };
