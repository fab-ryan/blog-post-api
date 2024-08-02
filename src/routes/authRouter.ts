import { Router } from 'express';
import { authController } from '../controllers';
import { validationMiddleware } from '../middleware';
import { loginValidationSchema } from '../validationsSchema';

const authRouter = Router();

authRouter.post(
  '/auth/login',
  validationMiddleware(loginValidationSchema),
  authController.login
);

export default authRouter;
