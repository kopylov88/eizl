import * as myFunctions from "./modules/functions.js";
import { useDynamicAdapt } from './modules/dynamicAdapt.js';
import Swiper from 'swiper/bundle';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { Fancybox } from "@fancyapps/ui";
import JustValidate from 'just-validate';


myFunctions.isWebp();
myFunctions.isTouch();
useDynamicAdapt();

const body = document.body;
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu__link');
menuBtn.addEventListener('click', function () {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
  body.classList.toggle('no-scroll');
})

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    menuBtn.classList.remove('active');
    menu.classList.remove('active');
    body.classList.remove('no-scroll');
  })
})

const heroSlider = new Swiper('.hero__slider', {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    formatFractionCurrent: function (number) {
      if (number > 9) {
        return number
      }
      else {
        return '0' + number
      }
    },
    formatFractionTotal: function (number) {
      if (number > 9) {
        return number
      }
      else {
        return '0' + number
      }
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'cube',
  cubeEffect: {
    slideShadows: false,
  },
  autoplay: true,
  loop: true,
});

//Анимация текста
const swiftUpElements = document.querySelectorAll('.swift-up-text');
swiftUpElements.forEach(elem => {
  const elements = elem.textContent.split(' ');
  const words = elements.filter(el => {
    return el !== '';
  })
  elem.innerHTML = '';
  words.forEach((el, index) => {
    words[index] = `<span><i>${words[index]}</i></span>`;
  });
  elem.innerHTML = words.join(' ');
  const children = document.querySelectorAll('span > i');
  children.forEach((node, index) => {
    node.style.animationDelay = `${(index + 3) * .2}s`; //Задержка перед началом анимации
  });
});

//Масонри плитка
const msnry = new Masonry('.portfolio__box', {
  itemSelector: '.portfolio__item',
  columnWidth: '.portfolio__item',
  gutter: '.gutter-sizer',
  percentPosition: true,
  horizontalOrder: true
});

if (window.innerWidth <= 600) {
  msnry.destroy();
}
else {
  const msnry = new Masonry('.portfolio__box', {
    itemSelector: '.portfolio__item',
    columnWidth: '.portfolio__item',
    gutter: '.gutter-sizer',
    horizontalOrder: true,
    percentPosition: true
  });
}

imagesLoaded(document.querySelector('.portfolio__box')).on('progress', function () {
  msnry.layout();
});

const portfolioSwiper = document.querySelector('.portfolio__wrapper');
let portfolioSlider;
function mobileSliderPortfolio() {
  if (window.innerWidth <= 600 && portfolioSwiper.dataset.mobile == 'false') {
    portfolioSlider = new Swiper(portfolioSwiper, {
      slidesPerView: 1,
      spaceBetween: 30,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 90,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        dynamicBullets: true,
      },
    });
    portfolioSwiper.dataset.mobile = 'true';
  }
  if (window.innerWidth > 600) {
    portfolioSwiper.dataset.mobile = 'false';
    if (portfolioSwiper.classList.contains('swiper-initialized')) {
      portfolioSlider.destroy();
    }
  }
}

if (portfolioSwiper) {
  mobileSliderPortfolio();
  window.addEventListener('resize', function () {
    mobileSliderPortfolio();
    if (window.innerWidth <= 600) {
      msnry.destroy();
    }
    else {
      const msnry = new Masonry('.portfolio__box', {
        itemSelector: '.portfolio__item',
        columnWidth: '.portfolio__item',
        gutter: '.gutter-sizer',
        horizontalOrder: true,
        percentPosition: true
      });
    }
  });

  window.addEventListener('orientationchange', () => {
    location.reload();
  })
}

const upBtn = document.querySelector(".up-btn");
const upArrow = document.querySelector(".up-arrow");
window.addEventListener("scroll", function () {
  upArrow.classList.toggle("active", window.scrollY > 500);
});
upBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const circle = document.querySelector('.progress');
const progressAnimation = () => {
  let scrollTop = window.scrollY;
  let windowHeight = window.innerHeight;
  let siteHeight = document.documentElement.scrollHeight;
  let percentageProgress = Math.floor(scrollTop / (siteHeight - windowHeight) * 100);
  let radius = circle.getAttribute('r');
  let circleLength = 2 * Math.PI * radius;
  circle.setAttribute('stroke-dasharray', circleLength);
  circle.setAttribute('stroke-dashoffset', circleLength - circleLength * percentageProgress / 100);
};

progressAnimation();

window.addEventListener('scroll', () => {
  progressAnimation();
});

const reviewsSlider = new Swiper('.reviews__box', {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 120,
    slideShadows: false,
  },
});

let center = [48.859560282842594, 2.3862566706933706];
function init() {
  let map = new ymaps.Map('map', {
    center: center,
    zoom: 16,
  });

  let placemark = new ymaps.Placemark(center, {
    balloonContent: `
			<div class="balloon">
				<div class="balloon__address">rue Merlin, 2, XI arrondissement, Paris</div>
				<div class="balloon__contacts">
					<a href="tel:+12093337777">+1 209 333 7777</a>
				</div>
			</div>
		`
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/icons/marker.svg',
    iconImageSize: [40, 40],
    iconImageOffset: [-19, -44],
  });

  // map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); // удаляем тип
  // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  map.controls.remove('rulerControl'); // удаляем контрол правил
  map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
  map.geoObjects.add(placemark);
  placemark.balloon.open();
}
ymaps.ready(init);

Fancybox.bind("[data-fancybox]", {
});

window.addEventListener('resize', function () {
  if (window.innerWidth <= 600) {
    Fancybox.destroy();
  }
  else {
    Fancybox.bind("[data-fancybox]", {
    });
  }
})

const validator = new JustValidate('.footer__form');
validator
  .addField('.footer__form-input', [
    {
      rule: 'required',
      errorMessage: 'Введите эдектронную почту',
    },
    {
      rule: 'email',
      errorMessage: 'Введите корректную почту',
    }
  ]).onSuccess((event) => {
    console.log('Validation passes and form submitted', event);
    let formData = new FormData(event.target);
    console.log(...formData);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    }
    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);
    event.target.reset();
  });


