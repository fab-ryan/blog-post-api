import { Router } from 'express';
import { userController } from '../controllers';
import {
  isAdmin,
  isAuthenticated,
  requestType,
  validationMiddleware,
} from '../middleware';
import {
  emailValidationSchema,
  idValidationSchema,
  userUpdateValidationSchema,
  userValidationSchema,
} from '../validationsSchema';

const userRouter = Router();

userRouter.post(
  '/users',
  validationMiddleware(userValidationSchema),
  userController.createUser
);
userRouter.get(
  '/users/profile',
  isAuthenticated,
  userController.getUserProfile
);

userRouter.get(
  '/users/:email',
  validationMiddleware(emailValidationSchema, requestType.params),
  userController.getUserByEmail
);
userRouter.get(
  '/admin/users',
  isAuthenticated,
  isAdmin,
  userController.getAllUsers
);

userRouter.patch(
  '/users',
  isAuthenticated,
  validationMiddleware(userUpdateValidationSchema),
  userController.updateUserById
);
userRouter.delete(
  '/users/:id',
  isAuthenticated,
  isAdmin,
  validationMiddleware(idValidationSchema, requestType.params),
  userController.deleteUserById
);

export default userRouter;
