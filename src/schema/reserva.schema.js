import Joi from "joi";

const reservacionBodySchema = Joi.object({
  servicioId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "El ID del servicio no puede estar vacío.",
      "any.required": "El ID del servicio es obligatorio.",
      "string.pattern.base": "El ID del servicio debe ser un ObjectId válido.",
    }),
  horario: Joi.date().required().messages({
    "date.base": "El horario debe ser una fecha válida.",
    "any.required": "El horario es obligatorio.",
  }),
  clienteNombre: Joi.string().required().messages({
    "string.empty": "El nombre del cliente no puede estar vacío.",
    "any.required": "El nombre del cliente es obligatorio.",
    "string.base": "El nombre del cliente debe ser una cadena de texto.",
  }),
  clienteEmail: Joi.string().email().required().messages({
    "string.empty": "El email del cliente no puede estar vacío.",
    "any.required": "El email del cliente es obligatorio.",
    "string.email": "El email del cliente debe tener un formato válido.",
  }),
  clienteTelefono: Joi.string().required().messages({
    "string.empty": "El teléfono del cliente no puede estar vacío.",
    "any.required": "El teléfono del cliente es obligatorio.",
    "string.base": "El teléfono del cliente debe ser una cadena de texto.",
  }),
  direccionCliente: Joi.string().required().messages({
    "string.empty": "La dirección del cliente no puede estar vacía.",
    "any.required": "La dirección del cliente es obligatoria.",
    "string.base": "La dirección del cliente debe ser una cadena de texto.",
  }),
  especializacion: Joi.string().allow("").optional().messages({
    "string.base": "La especialización debe ser una cadena de texto.",
  }),
  observaciones: Joi.string().allow("").messages({
    "string.base": "Las observaciones deben ser una cadena de texto.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export { reservacionBodySchema };
