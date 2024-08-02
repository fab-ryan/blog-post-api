import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './user';

export interface PostAttributes {
  id: string;
  title: string;
  content: string;
  image: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface PostCreationAttributes
  extends Omit<PostAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

/**
 * The Post model
 * the model is defined by extending the Model class
 * the first generic parameter is the type of the attributes
 */
export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: string;

  public title!: string;

  public content!: string;

  public image!: string;

  public userId!: string;

  public createdAt!: Date;

  public updatedAt!: Date;

  public deletedAt!: Date | null;

  public readonly user?: User;

  /**
   * Initialize the Association
   * @param {any} models - The models object
   * @returns {void}
   * @memberof Post
   */
  static associate(models: { User: typeof User }): void {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }

  /**
   * Return Object without deletedAt
   * @memberof Post
   * @returns {Object} The object without deletedAt property.
   */
  toJSON() {
    return { ...this.get(), deletedAt: undefined };
  }
}

/**
 * Initialize the Post model
 * @param {Sequelize} sequelize - The Sequelize instance
 * @returns {Model} The Post model
 * @memberof Post
 * @export PostsModal
 */
function PostsModal(sequelize: Sequelize) {
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      paranoid: true,
      timestamps: true,
      tableName: 'posts',
    }
  );

  return Post;
}

export default PostsModal;
