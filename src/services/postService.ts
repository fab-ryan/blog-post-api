import Database, {
  PostCreationAttributes,
  PostAttributes,
  Post,
} from '../database';

/**
 * The Post service class
 * class contains all the methods for the post model
 */
class PostService {
  /**
   * Create a new post
   * @param {PostCreationAttributes} post - The post object
   * @returns {Promise<Post>} - The newly created post
   * @throws {Error} - If the post creation fails
   * @description This method creates a new post
   */
  static async create(post: PostCreationAttributes): Promise<Post> {
    return Database.Post.create(post);
  }

  /**
   * Get all posts
   * @returns {Promise<Post[]>} - The list of posts
   * @throws {Error} - If the post retrieval fails
   * @description This method retrieves all posts
   */
  static async getAll(): Promise<Post[]> {
    return Database.Post.findAll({
      include: [
        {
          model: Database.User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });
  }

  /**
   * Get a post by id
   * @param {string} id - The post id
   * @returns {Promise<Post | null>} - The post object
   * @throws {Error} - If the post retrieval fails
   * @description This method retrieves a post by id
   */
  static async getById(id: string): Promise<Post | null> {
    return Database.Post.findOne({
      where: { id },
      include: [
        {
          model: Database.User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });
  }

  /**
   * Update a post
   * @param {string} id - The post id
   * @param {PostAttributes} post - The post object
   * @returns {Promise<Post | null>} - The updated post object
   * @throws {Error} - If the post update fails
   * @description This method updates a post
   * @returns {Promise<Post | null>} - The updated post object
   */
  static async update(id: string, post: PostAttributes): Promise<Post | null> {
    const foundPost = await Database.Post.findOne({ where: { id } });
    if (!foundPost) {
      return null;
    }
    await Database.Post.update(post, { where: { id } });
    return foundPost;
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Delete a post
   * @param {string} id - The post id
   * @returns {Promise<void>}
   * @throws {Error} - If the post deletion fails
   * @description This method deletes a post
   * @returns {Promise<void>}
   */
  static async delete(id: string): Promise<void> {
    await Database.Post.destroy({ where: { id } });
  }

  /**
   * Get all posts by user id
   * @param {string} userId - The user id
   * @returns {Promise<Post[]>} - The list of posts
   * @throws {Error} - If the post retrieval fails
   * @description This method retrieves all posts by user id
   */
  static async getByUserId(userId: string): Promise<Post[]> {
    return Database.Post.findAll({
      where: { userId },
      include: [
        {
          model: Database.User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });
  }
}

export { PostService };
