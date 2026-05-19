const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FotoAnuncio = sequelize.define('FotoAnuncio', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  anuncio_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  url_foto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orden_presentacion: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fecha_subida: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'fotos_anuncios',
  timestamps: true,
});

module.exports = FotoAnuncio;
