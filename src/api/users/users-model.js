const db = require('../../db/db-config');

module.exports = {
  add,
  remove,
};

function add(user) {
  return db('users').insert(user);
}

function remove(id) {
  return db('users').where({ id }).del();
}
