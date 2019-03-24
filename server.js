require("dotenv").config();

const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const http = require("http");
const https = require("https");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const { default: enforceHttps } = require("koa-sslify");

const app = new Koa();
const router = new Router();

router.post("/", async ctx => {
  const { body } = ctx.request;
  ctx.response.body = "received: \n" + JSON.stringify(body, null, 2);
});

router.get("/", async ctx => {
  ctx.response.body = "Hello.";
});

const PORT = 9898;

app
  .use(cors())
  .use(bodyParser())
  .use(enforceHttps({ port: PORT }))
  .use(router.routes())
  .use(router.allowedMethods());

// SSL options
const HTTPS_CERT_PATH = (process.env.NODE_ENV = "localhost"
  ? process.env.LOCAL_CERT_PATH
  : process.env.REMOTE_CERT_PATH);
const HTTPS_KEY_PATH = (process.env.NODE_ENV = "localhost"
  ? process.env.LOCAL_CERT_KEY_PATH
  : process.env.REMOTE_CERT_KEY_PATH);

const options = {
  key: fs.readFileSync(HTTPS_KEY_PATH, "utf8"),
  cert: fs.readFileSync(HTTPS_CERT_PATH, "utf8")
};

// // start the server
const server = https.createServer(options, app.callback()).listen(PORT);

if (server.listening) {
  console.log(`HTTPS Server Listening on port: https://localhost:${PORT}`);
}
