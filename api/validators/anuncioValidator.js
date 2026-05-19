const { body, param } = require('express-validator');

const createAnuncioValidator = [
  body('tipo')
    .isIn(['cuarto', 'casa', 'habitacion', 'departamento', 'local']).withMessage('El tipo debe ser cuarto, casa, habitacion, departamento o local'),
  body('titulo')
    .isLength({ min: 5, max: 100 }).withMessage('El título debe tener entre 5 y 100 caracteres'),
  body('descripcion')
    .isLength({ min: 20, max: 5000 }).withMessage('La descripción debe tener entre 20 y 5000 caracteres'),
  body('precio_mensual')
    .isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0'),
  body('direccion')
    .isLength({ min: 5 }).withMessage('La dirección debe tener al menos 5 caracteres'),
  body('zona')
    .notEmpty().withMessage('La zona es obligatoria'),
  body('metodo_contacto')
    .isIn(['whatsapp', 'correo', 'telefono', 'multicanal']).withMessage('Método de contacto no válido'),
  body('numero_contacto')
    .optional({ checkFalsy: true })
    .matches(/^9\d{8}$/).withMessage('Debe ser un número de WhatsApp válido (9 dígitos)'),
  body('telefono_contacto')
    .optional({ checkFalsy: true })
    .matches(/^9\d{8}$/).withMessage('Debe ser un número de llamadas válido (9 dígitos)'),
  body('correo_contacto')
    .optional({ checkFalsy: true })
    .isEmail().withMessage('Debe ser un correo electrónico válido'),
];

const updateAnuncioValidator = [
  body('tipo')
    .optional()
    .isIn(['cuarto', 'casa', 'habitacion', 'departamento', 'local']).withMessage('El tipo debe ser cuarto, casa, habitacion, departamento o local'),
  body('titulo')
    .optional()
    .isLength({ min: 5, max: 100 }).withMessage('El título debe tener entre 5 y 100 caracteres'),
  body('descripcion')
    .optional()
    .isLength({ min: 20, max: 5000 }).withMessage('La descripción debe tener entre 20 y 5000 caracteres'),
  body('precio_mensual')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0'),
  body('direccion')
    .optional()
    .isLength({ min: 5 }).withMessage('La dirección debe tener al menos 5 caracteres'),
  body('zona')
    .optional()
    .notEmpty().withMessage('La zona es obligatoria'),
];

const statusAnuncioValidator = [
  body('status')
    .isIn(['activo', 'pausado', 'eliminado']).withMessage('Estado no válido'),
];

module.exports = {
  createAnuncioValidator,
  updateAnuncioValidator,
  statusAnuncioValidator,
};
