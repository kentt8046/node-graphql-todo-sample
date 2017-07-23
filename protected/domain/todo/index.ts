import gql from "graphql-tag";

import { runQuery, runMutation } from "../../lib/graphql";

export * from "./subscription";

const TODO_LIST_FETCH_QUERY = gql`
query ($authorId: ID) {
  todoList(authorId: $authorId) {
    id
    body
    done
  }
}
`;
export function fetchTodoList(authorId?: string) {
  return runQuery(TODO_LIST_FETCH_QUERY, { authorId });
}

const TODO_CREATE_MUTATION = gql`
mutation ($args: TodoCreateArgs!) {
  todo: createTodo(args: $args) {
    id
    body
    done
    author {
      id
    }
  }
}
`;
export function createTodo(todo) {
  return runMutation(TODO_CREATE_MUTATION, { args: todo });
}

const TODO_UPDATE_MUTATION = gql`
mutation ($args: TodoUpdateArgs!) {
  todo: updateTodo(args: $args) {
    id
    body
    done
    author {
      id
    }
  }
}
`;
export function updateTodo(todo) {
  return runMutation(TODO_UPDATE_MUTATION, { args: todo });
}

const TODO_REMOVE_MUTATION = gql`
mutation ($args: TodoRemoveArgs!) {
  id: removeTodo(args: $args)
}
`;
export function removeTodo(id) {
  return runMutation(TODO_REMOVE_MUTATION, { args: { id } });
}

const TODO_DONE_MUTATION = gql`
mutation ($args: TodoDoneArgs!) {
  todo: doneTodo(args: $args) {
    id
    body
    done
    author {
      id
    }
  }
}
`;
export function doneTodo(todo) {
  return runMutation(TODO_DONE_MUTATION, { args: todo });
}
