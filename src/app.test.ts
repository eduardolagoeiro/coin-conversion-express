import request from 'supertest';
import app from './app';

describe('test status', () => {
  test('Request /status should return ok', async () => {
    const result = await request(app).get('/api/status').send();

    expect(result.status).toBe(200);
    expect(result.text).toBe('ok');
  });
});

describe('test 404', () => {
  test('Request should return 404 when not match', async () => {
    const result = await request(app).get('/api/something_not_exists').send();

    expect(result.status).toBe(404);
  });
});
