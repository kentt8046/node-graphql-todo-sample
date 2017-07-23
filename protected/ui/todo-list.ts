import * as $ from "jquery";

import { createTodoCard } from "./todo-card";

export function createTodoList({ todoList }) {
  $("#todo_list").empty();
  const elements = todoList.map(createTodoCard);
  $("#todo_list").prepend(elements);
}

export function appendTodo({ todo }) {
  const element = createTodoCard(todo);
  $("#todo_list").prepend(element);
}
