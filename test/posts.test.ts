import { expect, it, describe, beforeEach } from '@jest/globals';
import { request, initialState, prefix, setupTesting } from './setup';
import path from 'path';

const testImage = path.resolve(__dirname, 'test.jpg');

setupTesting();

beforeEach(async () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

var postId: string = '';

describe('Post Testing On side for both create or edit or update post', () => {
  it('should return 200', async () => {
    const response = await request.get('/post');
    expect(response.status).toBe(404);
  });

  it('should create a new post', async () => {
    const payload = {
      title: 'Test Post',
      content: 'This is a test post',
      image: testImage,
    };
    const response = await request
      .post(`${prefix}/posts`)
      .field('title', payload.title)
      .field('content', payload.content)
      .attach('image', payload.image)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${initialState.token}`);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data).toHaveProperty('content');
    postId = response.body?.data?.id;
    expect(response.body.message).toBe('Post created successfully');
  });

  it('should return 400 for missing fields', async () => {
    const payload = {
      title: '',
      content: 'This is a test post',
      image: testImage,
    };
    const response = await request
      .post(`${prefix}/posts`)
      .field('title', payload.title)
      .field('content', payload.content)
      .attach('image', payload.image)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${initialState.token}`);

    expect(response.status).toBe(400);
  });

  it('should return 200 for getting all posts', async () => {
    const response = await request.get(`${prefix}/posts`);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should return 200 for getting post by id', async () => {
    const response = await request.get(`${prefix}/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data).toHaveProperty('content');
  });

  it('should return 404 for getting post by invalid id', async () => {
    const response = await request.get(`${prefix}/posts/invalid_id`);
    expect(response.status).toBe(404);
  });

  it('should return 200 for updating post', async () => {
    const payload = {
      title: 'Updated Post',
      content: 'This is an updated post',
    };
    const response = await request
      .patch(`${prefix}/posts/${postId}`)
      .send(payload)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data).toHaveProperty('content');
    expect(response.body.message).toBe('Post updated successfully');
  });

  it('should return all posts by user', async () => {
    const response = await request
      .get(`${prefix}/posts-user`)
      .set('Authorization', `Bearer ${initialState.token}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should return 200 for deleting post', async () => {
    const response = await request
      .delete(`${prefix}/posts/${postId}`)
      .set('Authorization', `Bearer ${initialState.token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post deleted successfully');
  });
});
