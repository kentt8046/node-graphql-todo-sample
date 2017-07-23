import * as NeDB from "nedb";

export function createDB(schema) {
  return new NeDB({
    filename: `/tmp/graphql-todo.${schema}.db`,
    autoload: true,
  });
}
