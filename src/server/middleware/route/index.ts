import * as Router from "koa-router";
import * as compose from "koa-compose";

export function route() {
  const router = new Router();

  return compose([
    router.routes(),
    router.allowedMethods(),
  ]);
}
