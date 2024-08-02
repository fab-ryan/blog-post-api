/* eslint-disable import/no-extraneous-dependencies */
import Database from '../database';
import { generateToken, decryptPassword } from '../utils';

interface LoginCredentials {
  email: string;
  password: string;
}

interface userReturnInterface {
  access_token: string;
  token_type: string;
  role: string;
}
/**
 * The Auth service class
 * class contains all the methods for the user model
 */
class AuthService {
  /**
   * Create a new user
   * @param {LoginCredentials} credentials - The user object
   * @returns {Promise<User>} - The newly created user
   * @throws {Error} - If the user creation fails
   * @description This method creates a new user
   */
  static async login(
    credentials: LoginCredentials
  ): Promise<userReturnInterface | null> {
    const user = await Database.User.findOne({
      where: { email: credentials.email },
    });
    if (!user) {
      return null;
    }
    const isPasswordValid = await decryptPassword(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      return null;
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const payload = {
      access_token: token,
      token_type: 'Bearer',
      role: user.role,
    };
    return payload;
  }

  /**
   * Check if a user exists
   * @param {string} email - The user email
   * @returns {Promise<boolean>} - The user object
   * @throws {Error} - If the user retrieval fails
   * @description This method retrieves a user by email
   */
  static async userExists(email: string) {
    const user = await Database.User.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    return !!user;
  }
}

export { AuthService };
