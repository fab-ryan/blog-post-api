import { expect, it, describe, beforeEach } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../src';
import { setupTesting } from './setup';

setupTesting();
describe('Welcome Test message and 404 for unknown routes', () => {
  it('should return 200', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return 404', async () => {
    const response = await supertest(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});
