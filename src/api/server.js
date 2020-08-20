const express = require('express');

const server = express();

const Users = require('./users/users-model');

server.use(express.json());

server.post('/users', (req, res) => {
  Users.add(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then((deleted) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = server;
