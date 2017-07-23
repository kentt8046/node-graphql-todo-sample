import { resolve } from "path";

import * as bodyparser from "koa-bodyparser";
import * as serve from "koa-static";
import * as compose from "koa-compose";

import { graphql } from "./graphql";
import { route } from "./route";

export function middleware() {
  return compose([
    bodyparser(),
    serve(resolve(__dirname, "../../../public"), { gzip: true }),
    graphql(),
    route(),
  ]);
}
