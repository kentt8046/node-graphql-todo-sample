import { promisify } from "util";

import { orderBy } from "lodash";

interface TodoQueryArgs {
  id: string;
}
export function todo(payload: TodoQueryArgs, args: TodoQueryArgs, ctx: AppContext) {
  const { id } = payload || args;
  console.log("todo", id, Object.keys(ctx));
  const { Todo } = ctx.db;
  const load = promisify(Todo.findOne.bind(Todo));

  return load({ _id: id });
}

interface TodoListQueryArgs {
  authorId?: string;
}
export async function todoList(_, args: TodoListQueryArgs, ctx: AppContext) {
  const { Todo } = ctx.db;
  const loadMany = promisify(Todo.find.bind(Todo));

  const { authorId } = args;
  const query: any = {};
  query.authorId = authorId || { $exists: false };
  const todos = await loadMany(query, v => v);

  return orderBy(todos, ["createdAt"], ["desc"]);
}
