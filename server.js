const app = require("./src/config/app");
const http = require("http");
const config = require("./src/config/config");
const logger = require("./src/utils/logger");

const server = http.createServer(app);

const PORT = config.PORT;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
