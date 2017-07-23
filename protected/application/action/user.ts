import * as $ from "jquery";

import { showNotification } from "../../ui/notification";
import { fetchTodoList } from "./todo";

export const userInfo = {
  id: localStorage.getItem("user_id") || "",
};
$("#user_form input[name=user_id]").val(userInfo.id);

export function setUserInfo() {
  userInfo.id = <string>$("#user_form input[name=user_id]").val();
  localStorage.setItem("user_id", userInfo.id);

  showNotification("success", "setting user info succeeded!!");
  fetchTodoList();
}

$("#user_form button").on("click", setUserInfo);
