const sequelize = require('../config/database');
const User = require('./User');
const Anuncio = require('./Anuncio');
const FotoAnuncio = require('./FotoAnuncio');
const ContactoRegistro = require('./ContactoRegistro');
const SystemSetting = require('./SystemSetting');
const PaymentRequest = require('./PaymentRequest');

// User - Anuncio
User.hasMany(Anuncio, {
  foreignKey: 'usuario_id',
  as: 'anuncios',
});
Anuncio.belongsTo(User, {
  foreignKey: 'usuario_id',
  as: 'usuario',
});

// Anuncio - FotoAnuncio
Anuncio.hasMany(FotoAnuncio, {
  foreignKey: 'anuncio_id',
  as: 'fotos',
});
FotoAnuncio.belongsTo(Anuncio, {
  foreignKey: 'anuncio_id',
  as: 'anuncio',
});

// Anuncio - ContactoRegistro
Anuncio.hasMany(ContactoRegistro, {
  foreignKey: 'anuncio_id',
  as: 'contactos',
});
ContactoRegistro.belongsTo(Anuncio, {
  foreignKey: 'anuncio_id',
  as: 'anuncio',
});

// User - PaymentRequest
User.hasMany(PaymentRequest, {
  foreignKey: 'usuario_id',
  as: 'pagos',
});
PaymentRequest.belongsTo(User, {
  foreignKey: 'usuario_id',
  as: 'usuario',
});

// Anuncio - PaymentRequest
Anuncio.hasMany(PaymentRequest, {
  foreignKey: 'anuncio_id',
  as: 'pagos',
});
PaymentRequest.belongsTo(Anuncio, {
  foreignKey: 'anuncio_id',
  as: 'anuncio',
});

const models = {
  User,
  Anuncio,
  FotoAnuncio,
  ContactoRegistro,
  SystemSetting,
  PaymentRequest,
};

module.exports = {
  sequelize,
  ...models,
};
