const { body } = require('express-validator');

const createContactoValidator = [
  body('visitante_email')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),
  body('anuncio_id')
    .isUUID().withMessage('ID de anuncio no válido'),
  body('tipo_contacto')
    .isIn(['whatsapp', 'correo', 'telefono']).withMessage('Tipo de contacto no válido'),
];

module.exports = {
  createContactoValidator,
};
