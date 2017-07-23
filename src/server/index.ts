import * as http from "http";

import * as Koa from "koa";

import { middleware } from "./middleware";
import { createContext } from "./context";
import { setupSubscriptionServer } from "./server";

export function createServer() {
  const app = new Koa();
  Object.assign(app.context, createContext());
  app.use(middleware());

  const server = http.createServer(app.callback());
  setupSubscriptionServer(server);

  return server;
}
