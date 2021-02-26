module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Images',
      {
        id: {
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4,
          primaryKey: true
        },
        product_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Products',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        url: {
          type: Sequelize.STRING(100),
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
    return queryInterface.dropTable('Images')
  }
};