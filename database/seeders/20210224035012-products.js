const uuid = require('uuid')
const{ QueryTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT `id` from `Users`',
      {
        type: QueryTypes.SELECT
      }
    )
console.log(users)
    if (users && users.length > 0) {
      return Promise.all(
        users.map((user, index) => queryInterface.bulkInsert('Products', [
          {
            id: uuid.v4(),
            name: 'Kaos Merah',
            description: 'Kaos merah yang keren dan berani',
            stock: '10',
            discount: '10000',
            sex: 'Pria',
            price: '60000',
            user_id: user.id,
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            id: uuid.v4(),
            name: 'Jaket Thrasher',
            description: 'Jaket majalah skateboard thrasher yang macho dan gaya',
            stock: '20',
            discount: '12000',
            sex: 'Pria',
            price: '110000',
            user_id: user.id,
            created_at: new Date(),
            updated_at: new Date()
          }
        ]))
      )
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null)           
  }
};
