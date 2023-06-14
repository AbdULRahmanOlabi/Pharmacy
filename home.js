// Initialize Swiper
var swiper = new Swiper('.swiper-container', {
  autoplay: {
    delay: 5000, // Set the delay to 5000 milliseconds (5 seconds)
  },
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
