(function() {
const slider = $('.slider').bxSlider({
  pager: false,
  controls: false
});

$(".section-bar__arrow-back").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();

})
$(".section-bar__arrow-forward").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
})
})()