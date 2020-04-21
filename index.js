const server = require("./api/server");

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log(`\n\n **** server listening on port ${PORT} **** \n\n`);
});
