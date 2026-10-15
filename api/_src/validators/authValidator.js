const { body } = require('express-validator');

const registerValidator = [
  body('email')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .custom((value) => {
      if (/\s/.test(value)) throw new Error('El correo no debe contener espacios');
      return true;
    })
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una minúscula')
    .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una mayúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
    .matches(/[^a-zA-Z0-9]/).withMessage('La contraseña debe tener al menos un carácter especial (!@#$%^&*.,-_)'),

  body('nombre_completo')
    .notEmpty().withMessage('El nombre completo es obligatorio')
    .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres')
    .trim()
    .escape(),

  body('telefono')
    .optional()
    .matches(/^9\d{8}$/).withMessage('Debe ser un número de teléfono peruano válido (9 dígitos)'),

  body('tipo_usuario')
    .optional()
    .isIn(['propietario', 'inquilino']).withMessage('Tipo de usuario inválido'),
];

const loginValidator = [
  body('email')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
];

const requestResetValidator = [
  body('email')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),
];

const confirmResetValidator = [
  body('token')
    .notEmpty().withMessage('El token es obligatorio'),
  body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una minúscula')
    .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una mayúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número'),
];

module.exports = {
  registerValidator,
  loginValidator,
  requestResetValidator,
  confirmResetValidator,
};
