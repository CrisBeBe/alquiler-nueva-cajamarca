const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentRequest = sequelize.define('PaymentRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  usuario_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  anuncio_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  numero_operacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
    defaultValue: 'pendiente',
  },
  motivo_rechazo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha_solicitud: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fecha_procesamiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'pagos_solicitudes',
  timestamps: true,
});

module.exports = PaymentRequest;
