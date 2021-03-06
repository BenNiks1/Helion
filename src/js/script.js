$(function () {
  $(".accounts-carusel").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    variableWidth: true,
    dots: true,
    arrows: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          centerMode: false,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false,
          initialSlide: 0,
        },
      },
    ],
  });
});

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

const navList = document.querySelector(".nav__list");
const subNav = document.querySelector(".subnav");

navList.addEventListener("mouseenter", () => {
  subNav.style.display = "flex";
});

subNav.addEventListener("mouseleave", () => {
  subNav.style.display = "none";
});
