import ApolloClient from "apollo-client";
// import { HttpLink } from "apollo-link";
import { createNetworkInterface } from "apollo-client";
import { SubscriptionClient, addGraphQLSubscriptions } from "subscriptions-transport-ws";

// const link = new HttpLink({ uri: "http://localhost:3000/graphql" });
const link = createNetworkInterface({ uri: "http://localhost:3000/graphql" });
const wsClient = new SubscriptionClient(`ws://localhost:3000/subscriptions`, { reconnect: true });
const networkInterface = addGraphQLSubscriptions(link, wsClient);

export const client = new ApolloClient({ networkInterface, addTypename: false });
