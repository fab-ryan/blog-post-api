import { Router, Request, Response } from 'express';
import { sendResponse } from '../utils';

import userRouter from './userRouter';
import authRouter from './authRouter';
import postRouter from './postRouter';

const router = Router();

const routers: Router[] = [userRouter, authRouter, postRouter];

router.use('/api', ...routers);
router.get('/', (req: Request, res: Response) => {
  sendResponse(res, 200, 'Welcome to the Posts API!');
});

router.use((req: Request, res: Response) => {
  sendResponse(res, 404, 'Resource not found!');
});

export { router };
