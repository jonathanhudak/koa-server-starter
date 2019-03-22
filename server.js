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
  ctx.response.body = "received" + JSON.stringify(body, null, 2);
});

router.get("/", async ctx => {
  ctx.response.body = "Hello.";
});

const PORT = 9898;

app
  .use(cors())
  .use(bodyParser())
  // .use(enforceHttps({ port: PORT }))
  .use(router.routes())
  .use(router.allowedMethods());

// // SSL options
// const HTTPS_CERT_PATH =
//   "/apollo/env/ParksideNginxProxy_webapp/var/test-webpack-dev-server.cert";
// const HTTPS_KEY_PATH =
//   "/apollo/env/ParksideNginxProxy_webapp/var/test-webpack-dev-server.key";
// const options = {
//   key: fs.readFileSync(HTTPS_KEY_PATH),
//   cert: fs.readFileSync(HTTPS_CERT_PATH)
// };

// // start the server
http.createServer({}, app.callback()).listen(PORT);
// https.createServer(options, app.callback()).listen(PORT);
