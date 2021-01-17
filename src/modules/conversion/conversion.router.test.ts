import request from 'supertest';
import app from '../../app';
import db from '../../db';
import { ConversionEntry } from '../../types';

beforeAll(async (done) => {
  await db.connect();
  done();
});

afterAll(async (done) => {
  await db.disconnect();
  done();
});

describe('/post', () => {
  test('should return a 400 when bad request', async () => {
    const result = await request(app).post('/api/conversion').send();
    expect(result.status).toBe(400);
  });

  test('should return a 200 when conversion is ok', async () => {
    const conversionEntry: ConversionEntry = {
      fromCoin: 'BRL',
      fromValue: 100,
      toCoin: 'USD',
    };
    const result = await request(app)
      .post('/api/conversion')
      .send(conversionEntry);
    expect(result.status).toBe(200);
  });
});
