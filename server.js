require("dotenv").config();

import fs from "fs";
import path from "path";
import Koa from "koa";
import Knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";
import Router from "koa-router";
import https from "https";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import enforceHttps from "koa-sslify";
import rootHandler from "./routes/root";
import todosRootHandler from "./routes/todos";

const app = new Koa();
const knex = Knex(knexConfig[process.env.NODE_ENV]);
const router = new Router();

Model.knex(knex);

router.post("/", rootHandler);
router.post("/todos", todosRootHandler);

const PORT = 9898;

app
  .use(cors())
  .use(bodyParser())
  .use(enforceHttps({ port: PORT }))
  .use(router.routes())
  .use(router.allowedMethods());

// SSL options
const HTTPS_CERT_PATH =
  process.env.NODE_ENV === "production"
    ? process.env.REMOTE_CERT_PATH
    : path.resolve(__dirname, process.env.LOCAL_CERT_PATH);
const HTTPS_KEY_PATH =
  process.env.NODE_ENV === "production"
    ? process.env.REMOTE_CERT_KEY_PATH
    : path.resolve(__dirname, process.env.LOCAL_CERT_KEY_PATH);

const options = {
  key: fs.readFileSync(HTTPS_KEY_PATH, "utf8"),
  cert: fs.readFileSync(HTTPS_CERT_PATH, "utf8")
};

export const server = https.createServer(options, app.callback());

// // start the server
if (!module.parent) {
  server.listen(PORT);

  if (server.listening) {
    console.log(`HTTPS Server Listening on port: https://localhost:${PORT}`);
  }
}
