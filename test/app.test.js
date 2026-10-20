const request = require('supertest');
const app = require('../src/app');

describe('Team POC API', () => {
  test('GET /health reports ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /tasks returns a list', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tasks creates a task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Demo the POC' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Demo the POC', done: false });
  });

  test('POST /tasks rejects an empty title', async () => {
    const res = await request(app).post('/tasks').send({ title: '   ' });
    expect(res.status).toBe(400);
  });
});
