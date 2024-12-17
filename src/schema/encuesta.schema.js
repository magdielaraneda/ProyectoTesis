import Joi from "joi";

const encuestaBodySchema = Joi.object({
  reservacionId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "El ID de la reservación no puede estar vacío.",
      "any.required": "El ID de la reservación es obligatorio.",
      "string.pattern.base": "El ID de la reservación debe ser un ObjectId válido.",
    }),
  clasificacion: Joi.number().min(1).max(7).required().messages({
    "number.base": "La clasificación debe ser un número.",
    "number.min": "La clasificación debe ser al menos 1.",
    "number.max": "La clasificación debe ser como máximo 7.",
    "any.required": "La clasificación es obligatoria.",
  }),
  comentario: Joi.string().allow("").messages({
    "string.base": "El comentario debe ser una cadena de texto.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export { encuestaBodySchema };