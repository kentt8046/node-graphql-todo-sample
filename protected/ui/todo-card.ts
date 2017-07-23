import * as $ from "jquery";
import { updateTodo } from "../application/action/todo";

export function createTodoCard(todo) {
  return $(`
  <div class="box todo-card" data-todo-id="${todo.id}">
    <div class="field">
      <div class="control">
        <label class="checkbox"><input type="checkbox" ${todo.done ? "checked" : ""}></label>
        ${todo.body}
        <button class="delete is-pulled-right"></button>
      </div>
    </div>
    <div class="field focused">
      <div class="control">
      <input class="input" type="text" name="body" value="${todo.body}">
      </div>
    </div>
    <div class="field focused is-grouped">
      <div class="control">
        <button class="button is-primary">Update</button>
      </div>
      <div class="control">
        <button class="button is-link">Cancel</button>
      </div>
    </div>
  </div>
  `);
}

export function replaceTodoCard(id) {
  const $old = $(`[data-todo-id=${id}`);

  return ({ todo }) => {
    const $new = createTodoCard(todo);
    $old.after($new);
    $old.remove();
  };
}

export function blurTodoCard(e: any) {
  e.stopPropagation();

  const $todo = $(".todo-card__focus");
  $todo.removeClass("todo-card__focus");
  $todo.addClass("todo-card");
}

export function focusTodoCard(this: any, e: any) {
  blurTodoCard(e);

  const $todo = $(this);
  $todo.removeClass("todo-card");
  $todo.addClass("todo-card__focus");

  $(".focused button", $todo).off();
  $(".focused button.is-primary", $todo).on("click", updateTodo);
  $(".focused button.is-link", $todo).on("click", blurTodoCard);

  const body = <string>$("input[name=body]", $todo).val();
  $("input[name=body]", $todo).val("");
  $("input[name=body]", $todo).focus();
  $("input[name=body]", $todo).val(body);
}

export function removeTodoCard($todo: JQuery<HTMLElement>) {
  return () => $todo.hide(400, () => $todo.remove());
}
