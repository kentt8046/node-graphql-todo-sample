import * as $ from "jquery";

function willHide($noti) {
  let removed = false;
  const $button = $(".delete", $noti);
  const onRemoved = () => {
    if (removed) return;
    $button.off();
    removed = true;
    $noti.hide(400, () => $noti.remove());
  };

  $(".delete", $noti).on("click", onRemoved);
  setTimeout(onRemoved, 3000);
}

export function showNotification(level, message) {
  const $box = $(".notify");

  const $noti = $(`
  <div class="notification is-${level}">
    <button class="delete"></button>
    ${message}
  </div>
  `);
  willHide($noti);
  $box.prepend($noti);
}
