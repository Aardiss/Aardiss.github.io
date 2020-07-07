function Accordion(selector) {
  const acco = document.querySelector(selector);
  const items = acco.querySelector('[data-list]').children;
  const close = acco.querySelector(".assort__close");

  acco.addEventListener('click', function(event) {
    const targetTrigger = event.target.closest('[data-trigger]');
    const target = event.target;

    // if (!targetTrigger) return;
    if (!targetTrigger) { 
      if (target.classList.contains('assort__close')) {
        const parentClose = target.parentNode;
        const parentContent = parentClose.parentNode;
        const parentWrap = parentContent.parentNode;
        parentWrap.classList.remove('assort-active');
        
        return;
      } else {
        return;
      }
    };
    
    const item = targetTrigger.parentNode;

    if (item.classList.contains('assort-active')) {
        item.classList.remove('assort-active');
    }else {
      for (let i=0; i < items.length;  i++) {
       items[i].classList.remove('assort-active');
      }

      item.classList.add('assort-active');
    }
  
  if (target.classList.contains('assort_close')) {
    item.classList.remove('assort-active');
  }
  
  });
}

new Accordion('#acco-menu');