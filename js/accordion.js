const acc = document.getElementsByClassName("command__profile-name");
const container = document.getElementsByClassName("command__profile");

const closeEvery = container => {
   const items = container.find('command__profile-panel');
   items.height(0);
}

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const container =$this.closest("command__list");
      closeEvery(container);
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    }else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    });
}
    