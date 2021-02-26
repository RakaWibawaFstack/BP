const { Model, DataTypes } = require('sequelize')           
const connection = require('../connection')

class Sizes extends Model {}

Sizes.init({
  id: {
    type: DataTypes.UUID,
    default: DataTypes.UUIDV4,
    primaryKey: true
  },
  size: {
    type: DataTypes.STRING(5),
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
  modelName: 'sizes',
  sequelize: connection,
  paranoid: true,
  timestamps: true,
  underscored: true
})

module.exports = Sizes