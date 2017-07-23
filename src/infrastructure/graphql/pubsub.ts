import { GraphQLFieldResolver } from "graphql";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export function createSubscription<S, C>(topic: string | string[], resolve?: GraphQLFieldResolver<S, C>) {
  return { resolve, subscribe: () => pubsub.asyncIterator(topic) };
}

export function publish<T>(topic: string, payload: T, meta?: object) {
  return pubsub.publish(topic, { [topic]: payload, ...meta });
}
