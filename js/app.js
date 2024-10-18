document.addEventListener('DOMContentLoaded', function () {
  // Инициализация слайдера Swiper
  const swiper = new Swiper('.swiper-container', {
    direction: 'vertical',  // Горизонтальный или вертикальный слайдер
    slidesPerView: 1,
    effect: "fade",
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    allowTouchMove: false, // Отключаем ручное управление слайдером для полного контроля через скролл
  });

  // Инициализация ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Настраиваем ScrollTrigger для 4-й секции (слайдера)
  ScrollTrigger.create({
    trigger: ".slider-section",    // Секция, на которой нужно остановиться
    start: "top top",              // Когда верх секции достигает верхней части экрана
    end: () => "+=" + (window.innerHeight * swiper.slides.length),  // Прокрутка на количество слайдов
    pin: true,                     // Фиксируем секцию
    scrub: true,                   // Плавная анимация при скролле
    snap: 1 / (swiper.slides.length - 1),  // Привязка к слайдам
    onUpdate: self => {
      const progress = self.progress * (swiper.slides.length - 1);  // Прогресс для управления слайдером
      swiper.slideTo(Math.round(progress));  // Переключение слайдов
    },
    onLeave: () => swiper.slideTo(swiper.slides.length - 1, 0),  // Оставляем последний слайд при скролле дальше
  });
});
