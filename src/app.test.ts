import request from 'supertest';
import app from './app';

describe('test status', () => {
  test('Request /status should return ok', async () => {
    const result = await request(app).get('/api/status').send();

    expect(result.status).toBe(200);
    expect(result.text).toBe('ok');
  });
});
