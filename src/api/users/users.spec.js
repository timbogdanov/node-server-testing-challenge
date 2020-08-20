const request = require('supertest');

const server = require('../server');
const db = require('../../db/db-config');

describe('server endpoints', () => {
  beforeEach(async () => {
    // empty the table and reset primary key back to 1
    await db('users').truncate();
  });

  describe('POST /users', () => {
    it('should post user to /users', async () => {
      await request(server).post('/users').send({
        username: 'timbogdanov',
        password: 'secretpassword',
      });

      const users = await db('users');

      expect(users).toHaveLength(1);
    });

    it('should return a 200 OK', async () => {
      await request(server)
        .post('/users')
        .send({
          username: 'timbogdanov',
          password: 'secretpassword',
        })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });
});
