$(function () {
  $(".accounts-carusel").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    variableWidth: true,
    dots: true,
    arrows: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
// $(function () {
//   $(".offers__list").slick({
//     infinite: true,
//     centerMode: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     initialSlide: 1,
//     variableWidth: true,
//     focusOnSelect: true,
//     arrows:false,
//   });
// });

// sing in
const signIn = document.querySelector(".sign-in");
const signInBtn = document.getElementById("sign-in");
const signInOverlay = document.querySelector(".sign-in__overlay");

signInBtn.onclick = () => {
  signIn.style.display = "block";
};
signInOverlay.onclick = () => {
  signIn.style.display = "none";
};
// sign up
const signUp = document.querySelector(".sign-up");
const signUpBtn = document.getElementById("sign-up");
const signUpOverlay = document.querySelector(".sign-up__overlay");

signUpBtn.onclick = () => {
  signUp.style.display = "block";
};
signUpOverlay.onclick = () => {
  signUp.style.display = "none";
};
