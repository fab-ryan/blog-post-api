/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, DataTypes, Sequelize } from 'sequelize';
import { Post } from './post';

/* eslint-disable @typescript-eslint/no-unused-vars */

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface UserCreationAttributes
  extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

/**
 * The User model
 * the model is defined by extending the Model class
 * the first generic parameter is the type of the attributes
 */
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;

  public name!: string;

  public email!: string;

  public password!: string;

  public role!: string;

  public createdAt!: Date;

  public updatedAt!: Date;

  public deletedAt!: Date | null;

  /**
   * Initialize the model
   * @param {any} models - The models object
   * @returns {void}
   */
  public static associate(models: { Post: typeof Post }): void {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
    });
  }

  /**
   *
   * @returns {void}
   */
  toJSON() {
    return { ...this.get(), password: undefined, deletedAt: undefined };
  }
}

/**
 * User model init function
 * @param {Sequelize} sequelize - The Sequelize instance
 * @returns {Model} - The User model
 */
function UserModal(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
      timestamps: true,
      tableName: 'users',
    }
  );
  return User;
}

export default UserModal;
