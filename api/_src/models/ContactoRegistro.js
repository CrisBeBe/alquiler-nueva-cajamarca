const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactoRegistro = sequelize.define('ContactoRegistro', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  anuncio_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  visitante_email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  tipo_contacto: {
    type: DataTypes.ENUM('whatsapp', 'correo', 'telefono'),
    allowNull: false,
  },
  fecha_contacto: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'contactos_registros',
  timestamps: true,
});

module.exports = ContactoRegistro;
