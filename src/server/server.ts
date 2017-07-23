import { Server } from "http";

import { createSubscriptionServer } from "../infrastructure/graphql";
import { schema } from "./middleware/graphql";

export function setupSubscriptionServer(server: Server) {
  return createSubscriptionServer(schema, server, "/subscriptions");
}
