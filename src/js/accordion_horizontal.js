(function() {
const mesureWidth = item => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".assort__list");
  const titlesBlocks = container.find(".assort__trigger");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".assort__content");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesBlocks.width();
  } else {
  reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingLeft - paddingRight
  }
};

const closeEveryItemContainer = container => {
  const item = container.find(".assort__item");
  const content = container.find(".assort__wrap");

  item.removeClass("assort-active");
  content.width(0);
}

const openItem = (item) => {
  const hiddenContent = item.find(".assort__wrap");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".assort__content");

  item.addClass("assort-active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}

$(".assort__trigger").on ("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".assort__item");
  const itemOpened = item.hasClass("assort-active");
  const container = $this.closest(".assort__list");

  if (itemOpened) {
    closeEveryItemContainer(container)
  } else {
    closeEveryItemContainer(container)
    openItem(item);
  }
});

$(".assort__close").on("click", e => {
  e.preventDefault();

  closeEveryItemContainer($('.assort__list'));
})
})()