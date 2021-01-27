const server = require('./src/api/server');

server.listen(8000, () => {
  console.log(`server running on http://localhost:8000`);
});

module.exports = server;
