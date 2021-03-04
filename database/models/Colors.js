const { Model, DataTypes } = require('sequelize')           
const connection = require('../connection')

class Colors extends Model {}

Colors.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  color: {
    type: DataTypes.STRING(50),
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
  modelName: 'Colors',
  sequelize: connection,
  paranoid: false,
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})

module.exports = Colors