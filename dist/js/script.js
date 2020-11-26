$(function () {
  $(".accounts-carusel").slick({
    infinite:true,
    centerMode: true,
    slidesToShow:1, 
    slidesToScroll:1,
    initialSlide:1,
    variableWidth: true,
    dots:true,
    arrows:true,
    focusOnSelect:true,
  });
});
