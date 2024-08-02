// eslint-disable-next-line import/no-extraneous-dependencies
import Database, { UserCreationAttributes } from '../database';
import { encryptPassword } from '../utils';

/**
 * The User service
 * class contains all the methods for the user model
 */
class UserService {
  /**
   * Create a new user
   * @param {UserCreationAttributes} user - The user object
   * @returns {Promise<User>} - The newly created user
   * @throws {Error} - If the user creation fails
   * @description This method creates a new user
   */
  static async createUser(user: UserCreationAttributes) {
    const hashedPassword = await encryptPassword(user.password);
    const newUser = await Database.User.create({
      ...user,
      password: hashedPassword,
    });
    return newUser;
  }

  /**
   * Get a user by email
   * @param {string} email - The user email
   * @returns {Promise<User>} - The user object
   * @throws {Error} - If the user retrieval fails
   * @description This method retrieves a user by email
   */
  static async getUserByEmail(email: string) {
    const user = await Database.User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }

  /**
   * Get a update user by id
   * @param {string} id - The user id
   * @param {UserCreationAttributes} user - The user object
   * @returns {Promise<User>} - The user object
   * @throws {Error} - If the user retrieval fails
   * @description This method retrieves a user by id
   * @description This method retrieves a user by id
   */
  static async updateUserById(id: string, user: UserCreationAttributes) {
    const updatedUser = await Database.User.update(user, { where: { id } });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  /**
   * Delete a user by id
   * @param {string} id - The user id
   * @returns {Promise<number>} - The number of deleted users
   * @throws {Error} - If the user deletion fails
   * @description This method deletes a user by id
   */
  static async deleteUserById(id: string) {
    const deletedUser = await Database.User.destroy({ where: { id } });
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  }

  /**
   * Get all users
   * @returns {Promise<User[]>} - The list of users
   * @throws {Error} - If the user retrieval fails
   * @description This method retrieves all users
   */
  static async getAllUsers() {
    const users = await Database.User.findAll();
    return users;
  }

  /**
   * Get a user by id
   * @param {string} id - The user id
   * @returns {Promise<User>} - The user object
   * @throws {Error} - If the user retrieval fails
   * @description This method retrieves a user by id
   */
  static async getUserById(id: string) {
    const user = await Database.User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export { UserService };
