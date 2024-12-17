import Joi from "joi";

const servicioBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser una cadena de texto.",
  }),
  categoria: Joi.string()
    .valid("prevención de riesgos", "estética", "limpieza")
    .required()
    .messages({
      "any.only": "La categoría debe ser 'prevención de riesgos', 'estética' o 'limpieza'.",
      "any.required": "La categoría es obligatoria.",
      "string.empty": "La categoría no puede estar vacía.",
      "string.base": "La categoría debe ser una cadena de texto.",
    }),
  description: Joi.string().allow("").messages({
    "string.base": "La descripción debe ser una cadena de texto.",
  }),
  precio: Joi.number().required().messages({
    "number.base": "El precio debe ser un número.",
    "any.required": "El precio es obligatorio.",
  }),
  subServicios: Joi.array()
    .items(
      Joi.object({
        nombre: Joi.string().required().messages({
          "string.empty": "El nombre del subservicio no puede estar vacío.",
          "any.required": "El nombre del subservicio es obligatorio.",
        }),
        precio: Joi.number().required().messages({
          "number.base": "El precio del subservicio debe ser un número.",
          "any.required": "El precio del subservicio es obligatorio.",
        }),
      })
    )
    .messages({
      "array.base": "Los subservicios deben ser un arreglo de objetos.",
    })
    .allow(null), 
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export { servicioBodySchema };
