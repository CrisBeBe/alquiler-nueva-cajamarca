const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Anuncio = sequelize.define('Anuncio', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  usuario_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('cuarto', 'casa', 'habitacion', 'departamento', 'local'),
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  precio_mensual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zona: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitud: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },
  longitud: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
  },
  amenidades: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  metodo_contacto: {
    type: DataTypes.ENUM('whatsapp', 'correo', 'telefono', 'multicanal'),
    allowNull: false,
  },
  numero_contacto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  correo_contacto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefono_contacto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  visualizaciones: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  estado: {
    type: DataTypes.ENUM('activo', 'pausado', 'eliminado'),
    defaultValue: 'activo',
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  featured_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  featured_until: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'anuncios',
  timestamps: true,
});

module.exports = Anuncio;
