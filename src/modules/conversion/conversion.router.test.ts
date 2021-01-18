import request from 'supertest';
import app from '../../app';
import db from '../../test/test-db';
import { ConversionEntry } from '../../types';
import ConversionRateModel from '../conversionRate/conversionRate.model';

beforeAll(async (done) => {
  await db.connect();
  done();
});

afterAll(async (done) => {
  await db.disconnect();
  done();
});

beforeEach(async (done) => {
  await db.clear();
  done();
});

describe('/post', () => {
  test('should return a 400 when bad request', async () => {
    const result = await request(app).post('/api/conversion').send();
    expect(result.status).toBe(400);
  });

  test('should return a 404 when no conversionRate to the conversion coins', async () => {
    const conversionEntry: ConversionEntry = {
      fromCoin: 'BRL',
      fromValue: 100,
      toCoin: 'USD',
    };
    const result = await request(app)
      .post('/api/conversion')
      .send(conversionEntry);

    expect(result.status).toBe(404);
  });

  test('should return a 200 when conversion is ok', async () => {
    await ConversionRateModel.create({
      fromCoin: 'BRL',
      toCoin: 'USD',
      rate: 0.25,
    });
    const conversionEntry: ConversionEntry = {
      fromCoin: 'BRL',
      fromValue: 100,
      toCoin: 'USD',
    };
    const result = await request(app)
      .post('/api/conversion')
      .send(conversionEntry);

    expect(result.status).toBe(200);
    const conversion = result.body;
    expect(conversion._id).toBeDefined();
    expect(conversion.createdAt).toBeDefined();
    expect(conversion.fromCoin).toEqual(conversionEntry.fromCoin);
    expect(conversion.fromValue).toEqual(conversionEntry.fromValue);
    expect(conversion.toCoin).toEqual(conversionEntry.toCoin);
    expect(conversion.toValue).toBeDefined();
  });
});
