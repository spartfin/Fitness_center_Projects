/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
'use strict';

(function () {

  // Плавный переход по якорям
  var subscription = document.getElementById('subscription');
  var headerInfoBuy = document.querySelector('.header__info_buy');

  var headerInfoBuyClick = function () {
    headerInfoBuy.addEventListener('click', function (evt) {
      evt.preventDefault();
      subscription.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };
  headerInfoBuyClick();


  // Переключение кнопок в блоке абонементы
  var active = 0;
  var prev = 0;
  var subscriptionBtn = document.getElementsByClassName('subscription__months_item');

  var activeBtn = function () {
    for (var i = 0; i < subscriptionBtn.length; i++) {
      var activeButton = function (i) {
        subscriptionBtn[i].addEventListener('click', function () {
          prev = active;
          active = i;
          changeActiveBtn();
        });
      };
      activeButton(i);
    }
  };
  activeBtn();

  var changeActiveBtn = function () {
    subscriptionBtn[prev].classList.remove('subscription__btn_active');
    subscriptionBtn[active].classList.add('subscription__btn_active');
  };


  // Валидация номера телефона
  var inp = document.querySelector('#tel');

  // Проверяем фокус
  inp.addEventListener('focus', function () {
    // Если там ничего нет или есть, но левое
    if (!/^\+\d*$/.test(inp.value)) {
      inp.value = '+7';
    }
  });

  inp.addEventListener('keypress', function (e) {
    // Отменяем ввод не цифр
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  });


  // Слайдер блока отзывы
  var next = document.querySelector('.reviews__click_right');
  var prew = document.querySelector('.reviews__click_left');

  var slides = document.getElementsByClassName('reviews__card');
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.zIndex = slides.length - i;
  }

  next.addEventListener('click', function (evt) {
    evt.preventDefault();
    var activeEl = document.querySelector('.active');
    if (activeEl.nextElementSibling) {
      activeEl.style.left = '-100%';
      activeEl.classList.remove('active');
      activeEl.nextElementSibling.classList.add('active');
      prew.classList.remove('no_active');
      prew.classList.remove('no_active');
      if (!activeEl.nextElementSibling.nextElementSibling) {
        next.classList.add('no_active');
      }
    }
  });

  prew.addEventListener('click', function (evt) {
    evt.preventDefault();
    var activeEl = document.querySelector('.active');
    if (activeEl.previousElementSibling) {
      activeEl.previousElementSibling.style.left = '0%';
      activeEl.classList.remove('active');
      activeEl.previousElementSibling.classList.add('active');
      next.classList.remove('no_active');
      next.classList.remove('no_active');
      if (!activeEl.previousElementSibling.previousElementSibling) {
        prew.classList.add('no_active');
      }
    }
  });

  // Слайдер блока тренеры
  var activeTrainer = 0;
  var leftArrow = document.querySelector('.trainers__click_left');
  var rightArrow = document.querySelector('.trainers__click_right');
  var slidesTrainers = document.getElementsByClassName('trainers__list_card');
  var widthWindow = document.body.clientWidth;

  window.addEventListener('resize', function () {
    var newWidthWindow = document.body.clientWidth;
    if (widthWindow !== newWidthWindow) {
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
  });

  var clickRightArrow = function () {
    rightArrow.addEventListener('click', function () {
      if (widthWindow <= 767) {
        activeTrainer >= 0 && activeTrainer < slidesTrainers.length - 1 ? ++activeTrainer : activeTrainer = 0;
      } else if (widthWindow >= 768 && widthWindow <= 1199) {
        activeTrainer >= 0 && activeTrainer < slidesTrainers.length / 2 - 1 ? ++activeTrainer : activeTrainer = 0;
      } else if (widthWindow >= 1200) {
        activeTrainer >= 0 && activeTrainer < slidesTrainers.length / 4 - 1 ? ++activeTrainer : activeTrainer = 0;
      }
      changeActiveSlide();
    });
  };
  clickRightArrow();

  var clickLeftArrow = function () {
    leftArrow.addEventListener('click', function () {
      if (widthWindow <= 767) {
        activeTrainer > 0 ? --activeTrainer : activeTrainer = slidesTrainers.length - 1;
      } else if (widthWindow >= 768 && widthWindow <= 1199) {
        activeTrainer > 0 ? --activeTrainer : activeTrainer = slidesTrainers.length / 2 - 1;
      } else if (widthWindow >= 1200) {
        activeTrainer >= 0 && activeTrainer < slidesTrainers.length / 4 - 1 ? ++activeTrainer : activeTrainer = 0;
      }
      changeActiveSlide();
    });
  };
  clickLeftArrow();

  var changeActiveSlide = function () {
    for (var i = 0; i < slidesTrainers.length; i++) {
      if (widthWindow <= 767) {
        slidesTrainers[i].style.transform = 'translate(' + -(activeTrainer * 226) + 'px)';
      } else if (widthWindow >= 768 && widthWindow <= 1199) {
        slidesTrainers[i].style.transform = 'translate(' + -(activeTrainer * 596) + 'px)';
      } else if (widthWindow >= 1200) {
        slidesTrainers[i].style.transform = 'translate(' + -(activeTrainer * 1190) + 'px)';
      }
    }
  };

})();
