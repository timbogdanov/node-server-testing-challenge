const express = require('express');

const server = express();

const Users = require('./users/users-model');

server.use(express.json());

server.post('/users', (req, res) => {
  Users.add(req.body).then((user) => {
    res.status(201).json(user);
  });
});

module.exports = server;
