const uuid = require('uuid')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = '12345678'
    return queryInterface.bulkInsert('Users', [
      {
        id: uuid.v4(),
        email: 'budi0001@gmail.com',
        password: bcrypt.hashSync(password, 12),
        full_name: 'Budi Santoso Siregar',
        role: 'Users',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuid.v4(),
        email: 'melody4444@gmail.com',
        password: bcrypt.hashSync(password, 12),
        full_name: 'Melody Ani Rahmaniah',
        role: 'Admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null)           
  }
};
