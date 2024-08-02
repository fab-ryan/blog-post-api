import { Request, Response } from 'express';
import { PostService } from '../services';
import { PostCreationAttributes } from '../database';
import { sendResponse } from '../utils';

interface PostRequest extends Request {
  body: PostCreationAttributes;
}

const createPost = async (req: PostRequest, res: Response) => {
  try {
    const { id } = req.user as { id: string };
    const post = await PostService.create({
      ...req.body,
      image: req.file?.filename as string,
      userId: id,
    });
    sendResponse(res, 201, post, 'Post created successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 500, null, message);
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostService.getAll();
    sendResponse(res, 200, posts, 'Posts retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 500, null, message);
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await PostService.getById(req.params.id);
    if (!post) {
      sendResponse(res, 404, null, 'Post not found');
      return;
    }
    sendResponse(res, 200, post, 'Post retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 404, null, message);
  }
};

const updatePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const postExists = await PostService.getById(id);
    if (!postExists) {
      sendResponse(res, 404, null, 'Post not found');
      return;
    }
    let filename = '';
    if (req.file) {
      filename = req.file.filename;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      filename = postExists.image;
    }
    const updatedPost = await PostService.update(id, {
      ...req.body,
      image: filename,
    });
    sendResponse(res, 200, updatedPost, 'Post updated successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 404, null, message);
  }
};

const deletePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const postExists = await PostService.getById(id);
    if (!postExists) {
      sendResponse(res, 404, null, 'Post not found');
      return;
    }
    await PostService.delete(id);
    sendResponse(res, 200, null, 'Post deleted successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 404, null, message);
  }
};

const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const posts = await PostService.getByUserId(id);
    sendResponse(res, 200, posts, 'Posts retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 404, null, message);
  }
};

const postController = {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
  getPostsByUser,
};
export { postController };
