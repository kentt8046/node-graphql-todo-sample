import { client } from "./client";

export * from "./client";

export function runQuery(query, variables) {
  return (
    client.query({ query, variables })
      .then(({ data }) => data)
      .catch(error => console.error(error))
  );
}

export function runMutation(mutation, variables) {
  return (
    client.mutate({ mutation, variables })
      .then(({ data }) => data)
      .catch(error => console.error(error))
  );
}
