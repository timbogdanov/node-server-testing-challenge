const request = require('supertest');

const server = require('../server');
const db = require('../../db/db-config');

describe('server endpoints', () => {
  beforeEach(async () => {
    await db('users').truncate();
    await request(server).post('/users').send({
      username: 'markusa',
      password: 'secretpassword',
    });
  });

  describe('POST /users', () => {
    it('should post user to /users', async () => {
      await request(server).post('/users').send({
        username: 'timbogdanov',
        password: 'secretpassword',
      });

      const users = await db('users');

      expect(users).toHaveLength(2);
    });

    it('should return a 200 OK', async () => {
      const res = await request(server).post('/users').send({
        username: 'timbogdanov',
        password: 'secretpassword',
      });

      expect(res.status).toBe(201);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete user from /users/:id', async () => {
      const res = await request(server).delete('/users/1');

      expect(res.status).toBe(204);
    });

    it('should return content type of json', async () => {
      await request(server)
        .post('/users')
        .send({
          username: 'timoshka',
          password: 'secretpassword',
        })
        .expect('Content-Type', /json/i);
    });
  });
});
