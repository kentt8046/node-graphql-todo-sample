import gql from "graphql-tag";

import { client } from "../../lib/graphql";

const TODO_UPDATED_SUBSCRIPTION = gql`
subscription onTodoUpdated {
  todoUpdated {
    id
    body
    done
  }
}
`;
export function subscribeTodoUpdated(next: (result: any) => void) {
  const updated$ = client.subscribe({ query: TODO_UPDATED_SUBSCRIPTION });
  const error = e => console.log("subscribeTodoUpdated error", e);
  const complete = () => console.log("subscribeTodoUpdated end");

  return updated$.subscribe({ next, error, complete });
}

const TODO_REMOVED_SUBSCRIPTION = gql`
subscription onTodoRemoved {
  todoRemoved {
    id
  }
}
`;
export function subscribeTodoRemoved(next: (result: any) => void) {
  const removed$ = client.subscribe({ query: TODO_REMOVED_SUBSCRIPTION });
  const error = e => console.log("subscribeTodoRemoved error", e);
  const complete = () => console.log("subscribeTodoRemoved end");

  return removed$.subscribe({ next, error, complete });
}
