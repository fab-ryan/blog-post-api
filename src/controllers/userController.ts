import { Request, Response } from 'express';
import { UserService } from '../services';
import { UserCreationAttributes } from '../database';
import { sendResponse } from '../utils';

interface UserRequest extends Request {
  body: UserCreationAttributes;
}

const createUser = async (req: UserRequest, res: Response) => {
  try {
    const userExists = await UserService.getUserByEmail(req.body.email);
    if (userExists) {
      sendResponse(res, 409, null, 'User already exists');
      return;
    }
    const user = await UserService.createUser(req.body);
    sendResponse(res, 201, user, 'User created successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 500, null, message);
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email as string;
    const user = await UserService.getUserByEmail(email);
    sendResponse(res, 200, user, 'User retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 404, null, message);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as { id: string };
    const user = await UserService.updateUserById(id, req.body);
    sendResponse(res, 200, user, 'User updated successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 404, null, message);
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.deleteUserById(req.params?.id);
    sendResponse(res, 200, user, 'User deleted successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 404, null, message);
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    sendResponse(res, 200, users, 'Users retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 500, null, message);
  }
};

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user as { id: string };
    const user = await UserService.getUserById(id?.id as string);
    sendResponse(res, 200, user, 'User retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    sendResponse(res, 404, null, message);
  }
};

const userController = {
  createUser,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getAllUsers,
  getUserProfile,
};
export { userController };
