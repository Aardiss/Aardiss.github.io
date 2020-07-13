(function() {
const sections = $("section");
const display = $(".maincontent");
const sideMenu =$(".fixed-menu__link");
const menuItems = sideMenu.find(".fixed-menu__link");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("section-active");

const countSectionPosition = (sectionEq) => {
  return sectionEq * -100;
};

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-theme");
  const activeClass = "fixed-black";
  
    if (menuTheme == "black") {
      sideMenu.addClass(activeClass);
    }else {
      sideMenu.removeClass(activeClass);
    }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {

  if (inScroll == false) {
    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections, sectionEq, "section-active");

    
    setTimeout(() => {
    inScroll = false;

    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__link--active");
    }, 1300);
  }
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".section-active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction == "next" && nextSection.length) {
    performTransition(nextSection.index())
  }
  if (direction == "prev" && nextSection.length) {
    performTransition(prevSection.index())
  }
}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
   scrollViewport("next");
  }
  if (deltaY < 0) {
scrollViewport("prev");
  }
});

$(window).on("keydown", e => {

  const tagName = e.target.tagName.toLowerCase();

  if (tagName != "input" && tagName != "textarea") {
    switch (e.keyCode) {
      case 38:
      scrollViewport("prev");
      break;
  
      case 40: 
      scrollViewport("next");
      break;
    }
  }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-to");
  const reqSection = $(`[data-id=${target}]`);

  performTransition(reqSection.index());
});

 if (isMobile) {
  $("body").swipe({
    swipe: function(event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";
  
      if (direction == "up") scrollDirection = "next";
      if (direction == "down") scrollDirection = "prev";
  
      scroller[scrollDirection]();
    },
  });
 }
})()
