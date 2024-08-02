import { Request, Response } from 'express';
import { AuthService } from '../services';
import { sendResponse } from '../utils';

interface LoginCredentials {
  email: string;
  password: string;
}

interface UserRequest extends Request {
  body: LoginCredentials;
}

const login = async (req: UserRequest, res: Response) => {
  try {
    const userExists = await AuthService.userExists(req.body.email);
    if (!userExists) {
      sendResponse(res, 401, null, 'User not found');
      return;
    }
    const user = await AuthService.login(req.body);
    if (!user) {
      sendResponse(res, 401, null, 'Invalid email or password');
      return;
    }
    sendResponse(res, 200, user, 'User logged in successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 401, null, message);
  }
};

const authController = {
  login,
};
export { authController };
