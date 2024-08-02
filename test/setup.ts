import { expect, it, describe, beforeEach } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../src';

interface InitialState {
  token: string;
  admin_token?: string;
  auth_type?: string;
  default_password?: string;
}

const initialState: InitialState = {
  token: '',
  auth_type: 'Bearer',
  default_password: 'password',
};
export const prefix = '/api';

const request = supertest(app);

export const setupTesting = () =>
  beforeEach(async () => {
    const payload = {
      email: 'test@test.com',
      password: initialState.default_password,
    };
    const res = await request.post('/api/auth/login').send(payload);
    const adminPayload = {
      email: 'admin@test.com',
      password: initialState.default_password,
    };
    const adminRes = await request.post('/api/auth/login').send(adminPayload);
    initialState.admin_token = adminRes.body?.data?.access_token;
    initialState.token = res.body?.data?.access_token;
    initialState.auth_type = 'Bearer';
  });

export { initialState, request };
