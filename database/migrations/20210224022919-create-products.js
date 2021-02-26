module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Products',
      {
        id: {
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        description: {
          type: Sequelize.STRING
        },
        stock: {
          type: Sequelize.INTEGER(50),
          allowNull: false
        },
        discount: {
          type: Sequelize.INTEGER(50),
          allowNull: false
        },
        sex: {
          type: Sequelize.STRING(10),
          allowNull: false
        },
        price: {
          type: Sequelize.INTEGER(50),
          allowNull: false
        },
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
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
    return queryInterface.dropTable('Products')
  }
};