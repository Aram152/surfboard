const slider = jQuery('.slider__list').bxSlider({
    pager: false,
    controls: false,
    touchEnabled: false
});

$('.svg__slider--l').click(e => {
    slider.goToPrevSlide();
});
$('.svg__slider--r').click(e => {
    slider.goToNextSlide();
});