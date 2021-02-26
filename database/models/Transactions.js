const { Model, DataTypes } = require('sequelize')           
const connection = require('../connection')

class Transactions extends Model {}

Transactions.init({
  id: {
    type: DataTypes.UUID,
    default: DataTypes.UUIDV4,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  total_payment: {
    type: DataTypes.INTEGER(50),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    default: new Date(),
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    default: new Date(),
    allowNull: false
  },
  deleted_at: {
    type: DataTypes.DATE,
  }
}, {
  modelName: 'transactions',
  sequelize: connection,
  paranoid: true,
  timestamps: true,
  underscored: true
})

module.exports = Transactions