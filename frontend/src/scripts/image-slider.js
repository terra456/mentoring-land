import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const baseConfig = {
  modules: [Autoplay],
  slidesPerView: "auto",
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  resizeObserver: true,
  watchOverflow: true,

  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },

  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    867: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
};

new Swiper(document.querySelector(".swiper"), baseConfig);
