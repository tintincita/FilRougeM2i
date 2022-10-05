const app = require("../app/app");
const http = require("http");
const config = require("../config/config");

const server = http.createServer(app);

const PORT = config.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
