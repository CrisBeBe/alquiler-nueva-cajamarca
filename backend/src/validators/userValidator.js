const { body } = require('express-validator');

const updateProfileValidator = [
  body('nombre_completo')
    .optional()
    .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('telefono')
    .optional()
    .matches(/^9\d{8}$/).withMessage('Debe ser un número de teléfono peruano válido (9 dígitos)'),
  body('foto_perfil_url')
    .optional()
    .isURL().withMessage('Debe ser una URL válida'),
  body('newPassword')
    .optional()
    .isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
  body('currentPassword')
    .optional()
    .notEmpty().withMessage('Debe proporcionar la contraseña actual'),
];

module.exports = {
  updateProfileValidator,
};
