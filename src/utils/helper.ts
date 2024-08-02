/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { config } from '../config';
import { logger } from './logger';

interface ITokenPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (user: ITokenPayload) => {
  logger.info('Generating token', { label: 'generateToken' });
  try {
    const token = jwt.sign(user, config.secret, { expiresIn: '1d' });
    return token;
  } catch (error) {
    logger.error('Error generating token', { label: 'generateToken' });
    throw new Error('Error generating token');
  }
};
export const encryptPassword = async (password: string) => {
  logger.info('Encrypting password', { label: 'encryptPassword' });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    logger.error('Error encrypting password', { label: 'encryptPassword' });
    throw new Error('Error encrypting password');
  }
};

export const decryptPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  logger.info('Decrypting password', { label: 'decryptPassword' });
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    logger.error('Error decrypting password', { label: 'decryptPassword' });
    throw new Error('Error decrypting password');
  }
};
