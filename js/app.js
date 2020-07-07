function Accordeon(selector) {
  const acco = document.querySelector(selector);
  const items = acco.querySelector('[data-list]').children;

  acco.addEventListener('click', function(event) {
    const target = event.target.closest('[data-trigger]');

    if (!target) return;
    
    const item = target.parentNode;

    if (item.classList.contains('assort-active')) {
        item.classList.remove('assort-active');
    }else {
      for (let i=0; i < items.length;  i++) {
       items[i].classList.remove('assort-active');
      }

      item.classList.add('assort-active');
    }
  });
}

new Accordeon('#acco-menu');