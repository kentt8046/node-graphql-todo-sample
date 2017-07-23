import * as Router from "koa-router";
import * as compose from "koa-compose";

import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";
import { makeExecutableSchema } from "graphql-tools";

import * as mutation from "./mutation";
import * as query from "./query";
import * as subscription from "./subscription";
import { typeDefs } from "./schema";
import * as type from "./type";

export const schema = (function makeSchema() {
  const resolvers = {
    ...type,
    Query: { ...query },
    Mutation: { ...mutation },
    Subscription: { ...subscription },
  };

  return makeExecutableSchema({ typeDefs, resolvers });
}());

export function graphql() {
  const router = new Router();

  router.post("/graphql", graphqlKoa(ctx => ({ schema, context: ctx })));
  router.get("/graphiql", graphiqlKoa({
    endpointURL: "/graphql",
    subscriptionsEndpoint: "ws://localhost:3000/subscriptions",
  }));

  return compose([router.routes(), router.allowedMethods()]);
}
