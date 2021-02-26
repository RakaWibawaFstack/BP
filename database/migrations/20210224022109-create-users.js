module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        full_name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        role: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          default: new Date(),
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          default: new Date(),
          allowNull: false
        },
        deleted_at: {
          type: Sequelize.DATE,
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {                   
    return queryInterface.dropTable('Users')
  }
};
