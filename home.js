const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let slideIndex = 0;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  slides[index].classList.add('active');
}

function nextSlide() {
  slideIndex++;
  if (slideIndex === slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide(slideIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
