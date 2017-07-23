import { Server } from "http";

import { execute, subscribe, GraphQLSchema } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

export function createSubscriptionServer(schema: GraphQLSchema, server: Server, path: string) {
  return SubscriptionServer.create({ schema, execute, subscribe }, { server, path });
}
