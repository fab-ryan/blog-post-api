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
        id: 'e05078ab-75cf-4386-9b1b-de49e2f67310',
        name: 'John',
        email: 'test@test.com',
        password:
          '$2y$10$qGh73FjmPiIGOE7b9nII3ODe64fritNLMPX0bpG/rXGfIZzHMnuKe', // password: password,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'e05078ab-75cf-4386-9b1b-de49e2f67313',
        name: 'Testing Admin',
        email: 'admin@test.com',
        password:
          '$2y$10$qGh73FjmPiIGOE7b9nII3ODe64fritNLMPX0bpG/rXGfIZzHMnuKe', // password: password,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

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
