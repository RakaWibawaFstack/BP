const { Model, DataTypes } = require('sequelize')           
const connection = require('../connection')

class Users extends Model {}

Users.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  role: {
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
  modelName: 'Users',
  sequelize: connection,
  paranoid: false,
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'

})

module.exports = Users