const { Model, DataTypes } = require('sequelize')           
const connection = require('../connection')

class Sizes extends Model {}

Sizes.init({
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
  size: {
    type: DataTypes.STRING(5),
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
  modelName: 'sizes',
  sequelize: connection,
  paranoid: false,
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})

module.exports = Sizes