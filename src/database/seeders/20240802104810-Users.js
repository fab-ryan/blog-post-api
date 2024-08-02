/* eslint-disable @typescript-eslint/no-unused-vars */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('users', [
      {
        id: '46ff5cfe-045e-417e-98d6-33a524af8145',
        name: 'admin',
        email: 'admin@admin.com',
        password:
          '$2y$10$qGh73FjmPiIGOE7b9nII3ODe64fritNLMPX0bpG/rXGfIZzHMnuKe', // password: password
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
