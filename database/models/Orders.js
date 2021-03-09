const { Model, DataTypes } = require('sequelize')           
const connection = require('../connection')

class Orders extends Model {}

Orders.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: "Products",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  transaction_id: {
    type: DataTypes.UUID,
    references: {
      model: "Transaction",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
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
    defaultValue: new Date(),
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
    allowNull: false
  },
  deleted_at: {
    type: DataTypes.DATE,
  }
}, {
  modelName: 'Orders',
  sequelize: connection,
  paranoid: false,
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})

module.exports = Orders