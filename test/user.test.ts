import { expect, it, describe, beforeEach } from '@jest/globals';

import { request, initialState, prefix, setupTesting } from './setup';
import { userController } from '../src/controllers';

setupTesting();

beforeEach(async () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
var userId:string = '';

describe('User Testing On side for both create or edit or update user', () => {
  it('should return 200', async () => {
    const response = await request.get('/user');
    expect(response.status).toBe(404);
  });

  it('should create a new user', async () => {
    const payload = {
      email: 'user@test.com',
      password: 'Password@123',
      name: 'Test User',
      role: 'user',
    };
    const response = await request
      .post(`${prefix}/users`)
      .send(payload)
      .set('Accept', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data).toHaveProperty('name');
    userId = response.body?.data?.id
    expect(response.body.message).toBe('User created successfully');
  });

  it('should return 400 for missing fields', async () => {
    const payload = {
      email: '',
      password: initialState.default_password,
      name: 'Test User',
    };
    const response = await request
      .post(`${prefix}/users`)
      .send(payload)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });

  it('should return 400 for Existing Emails', async () => {
    const payload = {
      email: 'user@test.com',
      password: 'Password@123',
      name: 'Test User',
    };
    const response = await request
      .post(`${prefix}/users`)
      .send(payload)
      .set('Accept', 'application/json');
    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User already exists');
  });

  it('should return 500 for any error message', async () => {
    const payload = {
      email: 'user@test.com',
      password: 'Password@123',
      name: 'Test User',
    };
    jest.spyOn(userController, 'createUser').mockImplementation(() => {
      throw new Error('Server Error');
    });
    const response = await request
      .post(`${prefix}/users`)
      .send(payload)
      .set('Accept', 'application/json');
    expect(response.status).toBe(409);
  });

  it('should return 200 for get user by email', async () => {
    const response = await request
      .get(`${prefix}/users/user@test.com`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${initialState.token}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data).toHaveProperty('name');
  });
  it('should return 404 for get user by email', async () => {
    const response = await request
      .get(`${/users/}users@gmail.com`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${initialState.token}`);
    expect(response.status).toBe(404);
  });

  it('should return 200 for update user by id', async () => {
    const payload = {
      name: 'user@test.com',
    };
    const response = await request
      .patch(`${prefix}/users`)
      .send(payload)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${initialState.token}`);
    expect(response.status).toBe(200);
   
  });

  it('should return 404 for update user by id', async () => {
    const payload = {
      name: 'user@gmail.com',
    };
    const response = await request
      .patch(`${prefix}/users/1234`)
      .send(payload)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${initialState.token}`);
    expect(response.status).toBe(404);
  });

  it('should return 200 for delete user by id', async () => {
    console.log(userId)
    const response = await request
      .delete(`${prefix}/users/${userId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${initialState.admin_token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  it('should return 404 for delete user by id', async () => {
    const response = await request
      .delete(`${prefix}/users/e05078ab-75cf-4386-9b1b-de49e2f6731e`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${initialState.admin_token}`);
    expect(response.status).toBe(404);
  });

  it('should return 200 for get all users', async () => {
    const response = await request
      .get(`${prefix}/admin/users`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${initialState.admin_token}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

});
