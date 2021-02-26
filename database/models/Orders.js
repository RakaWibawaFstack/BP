const { Model, DataTypes } = require('sequelize')           
const connection = require('../connection')

class Orders extends Model {}

Orders.init({
  id: {
    type: DataTypes.UUID,
    default: DataTypes.UUIDV4,
    primaryKey: true
  },
  product_price: {
    type: DataTypes.INTEGER(50),
    allowNull: false
  },
  product_discount: {
    type: DataTypes.INTEGER(50),
    allowNull: false
  },
  product_qty: {
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
  modelName: 'Orders',
  sequelize: connection,
  paranoid: true,
  timestamps: true,
  underscored: true
})

module.exports = Orders