import { promisify } from "util";

export const Todo = {
  id(_todo: Todo) {
    return _todo.id || _todo._id;
  },
  author(_todo: Todo, _: any, ctx: AppContext) {
    const { User } = ctx.db;
    const load = promisify(User.findOne.bind(User));

    return load({ _id: _todo.authorId });
  },
};
