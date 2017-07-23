export const typeDefs = `
scalar Date

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

type Query {
  todo(id: ID!): Todo
  todoList(authorId: ID): [Todo]!
}

type Mutation {
  createTodo(args: TodoCreateArgs!): Todo!
  updateTodo(args: TodoUpdateArgs!): Todo!
  removeTodo(args: TodoRemoveArgs!): ID!
  removeAllTodo: Int!
  doneTodo(args: TodoDoneArgs!): Todo!
}

type Subscription {
  todoUpdated: Todo
  todoRemoved: RemovedResult
}

type RemovedResult {
  id: ID!
}

type User {
  id: ID!
}

type Todo {
  id: ID
  body: String
  done: Boolean
  author: User
}

input TodoCreateArgs {
  body: String!
  authorId: ID
}
input TodoUpdateArgs {
  id: ID!
  body: String!
}
input TodoRemoveArgs {
  id: ID!
}
input TodoDoneArgs {
  id: ID!
  done: Boolean!
}
`;
