(function() {
const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu__link");
const menuItems = sideMenu.find(".fixed-menu__link");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

window.inScroll = false;

sections.first().addClass("section-active");

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;
  if (isNaN(position)) {
    return 0;
  }
  return position;
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

const performTransition = (sectionEq) => {
 
  if (sectionEq < 0) {
    sectionEq = 0
  }

  if (window.inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  window.inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });
    

    resetActiveClassForItem(sections, sectionEq, "section-active");

    
    setTimeout(() => {
      window.inScroll = false;


    sideMenu.find(".fixed-menu__link")
    sideMenu.removeClass("active")
    let currentMenu = sideMenu.eq(sectionEq)
    currentMenu.addClass("active")

    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__link.active");
    }, transitionOver + mouseInertiaOver);
};

const viewportScroller = () => {
  const activeSection = sections.filter(".section-active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index())
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index())
      }
    },
  };
};

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }
  if (deltaY < 0) {
   scroller.prev();
  }
});

$(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == "input" ||  tagName == "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 38:
    scroller.prev();
      break;
  
      case 40: 
      scroller.next();
      break;
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
  
      if (direction == "up") scroller["next"]();
      if (direction == "down") scroller["prev"]();
  
    },
  });
 }
})()


