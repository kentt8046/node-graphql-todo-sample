import { promisify } from "util";

import { publish } from "../../../../infrastructure/graphql";

declare global {
  interface Todo {
    _id: string;
    id: string;
    body: String;
    authorId: string;
    done: boolean;
  }
}

interface TodoCreateArgs {
  body: string;
  authorId?: string;
}
export async function createTodo(_, { args }: MutationArgs<TodoCreateArgs>, ctx: AppContext) {
  const { Todo } = ctx.db;
  const create = promisify(Todo.insert.bind(Todo));

  const todo = await create({ ...args, createdAt: new Date(), done: false });

  publish("todoUpdated", todo);

  return todo;
}

interface TodoUpdateArgs {
  id: string;
  body?: string;
  authorId?: string;
  done?: boolean;
}
export async function updateTodo(_, { args: { id, ...args } }: MutationArgs<TodoUpdateArgs>, ctx: AppContext) {
  const { Todo } = ctx.db;
  const update = promisify(Todo.update.bind(Todo));
  await update({ _id: id }, { $set: args }, {});

  const load = promisify(Todo.findOne.bind(Todo));
  const todo = await load({ _id: id });

  publish("todoUpdated", todo);

  return todo;
}

interface TodoRemoveArgs {
  id: string;
}
export async function removeTodo(_, { args: { id } }: MutationArgs<TodoRemoveArgs>, ctx: AppContext) {
  const { Todo } = ctx.db;
  const remove = promisify(Todo.remove.bind(Todo));
  await remove({ _id: id }, {});

  publish("todoRemoved", { id });

  return id;
}

export function removeAllTodo(_, _args, ctx: AppContext) {
  const { Todo } = ctx.db;
  const remove = promisify(Todo.remove.bind(Todo));

  return remove({}, { multi: true });
}

export const doneTodo = updateTodo;
