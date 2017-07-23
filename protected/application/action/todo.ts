import * as $ from "jquery";

import { createTodoList, appendTodo } from "../../ui/todo-list";
import { focusTodoCard, replaceTodoCard, removeTodoCard } from "../../ui/todo-card";

import * as domain from "../../domain/todo";
import { userInfo } from "./user";

(<any>window).$ = $;

function onTodoUpdated(todo) {
  const hasTodo = $(`div[data-todo-id=${todo.id}]`).length;
  if (hasTodo) return replaceTodoCard(todo.id)({ todo });
  else return appendTodo({ todo });
}

function setTodoRemovedEvent() {
  const $button = $("#todo_list button.delete");
  $button.off("click");
  $button.on("click", removeTodo);
}

function setTodoFocusedEvent() {
  const $todo = $("div[data-todo-id]");
  $todo.off();
  $todo.on("click", focusTodoCard);
}

function setTodoDoneChangedEvent() {
  const $done = $("div[data-todo-id] input[type=checkbox]");
  $done.off();
  $done.on("click", e => e.stopPropagation());
  $done.change(doneTodo);
}

export function fetchTodoList() {
  domain
    .fetchTodoList(userInfo.id)
    .then(createTodoList)
    .then(setTodoRemovedEvent)
    .then(setTodoFocusedEvent)
    .then(setTodoDoneChangedEvent);
}

fetchTodoList();

export function createTodo() {
  const body = $("#todo_form input[type=text]").val();
  const authorId = userInfo.id;
  domain.createTodo({ body, authorId });
}

$("#todo_form button").on("click", createTodo);

export function updateTodo(this: any) {
  const $todo = $(this).parents(".box[data-todo-id]");
  const body = $("input[name=body]", $todo).val();
  const id = $todo.data("todo-id");

  domain.updateTodo({ id, body });
}

export function removeTodo(this: any, e: any) {
  e.stopPropagation();

  const $todo = $(this).parents(".box[data-todo-id]");
  const id = $todo.data("todo-id");

  domain.removeTodo(id);
}

export function doneTodo(this: any, e: any) {
  e.stopPropagation();

  const $done = $(this);
  const $todo = $done.parents(".box[data-todo-id]");
  const id = $todo.data("todo-id");
  const done = $done.prop("checked");

  domain.doneTodo({ id, done });
}

domain.subscribeTodoUpdated(({ todoUpdated: todo }) => (
  Promise.resolve(todo)
    .then(onTodoUpdated)
    .then(setTodoRemovedEvent)
    .then(setTodoFocusedEvent)
    .then(setTodoDoneChangedEvent)
));
domain.subscribeTodoRemoved(({ todoRemoved: { id } }) => {
  const $todo = $(`.box[data-todo-id=${id}]`);
  removeTodoCard($todo)();
});
