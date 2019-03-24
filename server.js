require("dotenv").config();

const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const https = require("https");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const { default: enforceHttps } = require("koa-sslify");
const { rootHandler } = require("./routes/root");

const app = new Koa();
const router = new Router();

router.post("/", rootHandler);

const PORT = 9898;

app
  .use(cors())
  .use(bodyParser())
  .use(enforceHttps({ port: PORT }))
  .use(router.routes())
  .use(router.allowedMethods());

// SSL options
const HTTPS_CERT_PATH = (process.env.NODE_ENV = "localhost"
  ? path.resolve(__dirname, process.env.LOCAL_CERT_PATH)
  : process.env.REMOTE_CERT_PATH);
const HTTPS_KEY_PATH = (process.env.NODE_ENV = "localhost"
  ? path.resolve(__dirname, process.env.LOCAL_CERT_KEY_PATH)
  : process.env.REMOTE_CERT_KEY_PATH);

const options = {
  key: fs.readFileSync(HTTPS_KEY_PATH, "utf8"),
  cert: fs.readFileSync(HTTPS_CERT_PATH, "utf8")
};

const server = https.createServer(options, app.callback());

// // start the server
if (!module.parent) {
  server.listen(PORT);

  if (server.listening) {
    console.log(`HTTPS Server Listening on port: https://localhost:${PORT}`);
  }
}

module.exports = {
  server
};
