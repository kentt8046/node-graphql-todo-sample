import { GraphQLFieldResolver } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { RedisPubSub } from "graphql-redis-subscriptions";

const pubsub = (() => {
  if (process.env.GRAPHQL_PUBSUB_TYPE === "redis") {
    return new RedisPubSub({
      connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        retry_strategy: options => {
          // reconnect after
          return Math.max(options.attempt * 100, 3000);
        }
      },
    });
  }

  return new PubSub();
})();

export function createSubscription<S, C>(topic: string | string[], resolve?: GraphQLFieldResolver<S, C>) {
  return { resolve, subscribe: () => pubsub.asyncIterator(topic) };
}

export function publish<T>(topic: string, payload: T, meta?: object) {
  return pubsub.publish(topic, { [topic]: payload, ...meta });
}
