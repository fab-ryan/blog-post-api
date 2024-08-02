import { Router } from 'express';
import { postController } from '../controllers';
import {
  validationMiddleware,
  multerUploads,
  isAuthenticated,
} from '../middleware';
import { postValidationSchema } from '../validationsSchema';

const postRouter = Router();

postRouter.post(
  '/posts',
  isAuthenticated,
  multerUploads.single('image'),
  validationMiddleware(postValidationSchema.createPost),
  postController.createPost
);
postRouter.get('/posts', postController.getPosts);
postRouter.get('/posts/:id', postController.getPostById);

postRouter.patch(
  '/posts/:id',
  isAuthenticated,
  validationMiddleware(postValidationSchema.updatePost),
  postController.updatePostById
);

postRouter.get('/posts-user', isAuthenticated, postController.getPostsByUser);
postRouter.delete('/posts/:id', isAuthenticated, postController.deletePostById);

export default postRouter;
