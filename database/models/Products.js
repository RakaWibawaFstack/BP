const { Model, DataTypes } = require('sequelize')           
const connection = require('../connection')

class Products extends Model {}

Products.init({
  id: {
    type: DataTypes.UUID,
    default: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  stock: {
    type: DataTypes.INTEGER(50),
    allowNull: false
  },
  discount: {
    type: DataTypes.INTEGER(50),
    allowNull: false
  },
  sex: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  price: {
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
  modelName: 'products',
  sequelize: connection,
  paranoid: true,
  timestamps: true,
  underscored: true
})

module.exports = Products