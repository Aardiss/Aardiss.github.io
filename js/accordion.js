  const closeOthers = list => {
  const panel = list.find(".command__profile-panel");
  const name = list.find(".command__profile-name");
 
  name.removeClass("active");
  panel.height(0);
}

const openNew = block => {
 const profile = block.closest(".command__profile");
 const panel = profile.find(".command__profile-panel");
 const panelBlock = profile.find(".command__profile-block");
 const scrollHeight = panelBlock.height();

 block.addClass("active");
 panel.height(scrollHeight);
}

$(".command__profile-name").click((e) => {   
   const $this = $(e.currentTarget);
   const list = $this.closest(".command__list"); 

   if ($this.hasClass("active")) {
    closeOthers(list);
   } else {
    closeOthers(list);
    openNew($this);
   }
  });