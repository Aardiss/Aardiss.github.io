const acc = document.getElementsByClassName("command__profile-name");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    }else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    });
}
    