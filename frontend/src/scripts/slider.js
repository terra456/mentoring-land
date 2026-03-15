import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

// Инициализируем все слайдеры на странице
document.querySelectorAll(".swiper").forEach((swiperEl) => {
  const section = swiperEl.closest("section");
  const sectionId = section?.id;

  // Базовая конфигурация
  const baseConfig = {
    modules: [Navigation],
    slidesPerView: "auto",
    height: "auto",
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    resizeObserver: true,
    watchOverflow: true,

    // Скрываем навигацию, когда нет возможности слайдить
    on: {
      init(swiper) {
        const nav = section?.querySelector(".swiper-navigation");
        if (!nav) return;
        nav.style.display = swiper.isLocked ? "none" : "";
      },
      resize(swiper) {
        const nav = section?.querySelector(".swiper-navigation");
        if (!nav) return;
        nav.style.display = swiper.isLocked ? "none" : "";
      },
    },

    navigation: {
      nextEl: section?.querySelector(".swiper-btn-next"),
      prevEl: section?.querySelector(".swiper-btn-prev"),
    },
  };

  // Специфичные настройки для разных секций
  if (sectionId === "delusion") {
    Object.assign(baseConfig, {
      spaceBetween: 0,
      slidesPerView: 1,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
          direction: "horizontal",
        },
        // когда ширина экрана >= 580px (планшеты)
        500: {
          slidesPerView: 3,
          spaceBetween: 1,
          direction: "vertical",
        },
      },
    });
  } else if (sectionId === "result") {
    Object.assign(baseConfig, {
      spaceBetween: 60,
      slidesPerView: 1,
      direction: "horizontal",
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // когда ширина экрана >= 580px (планшеты)
        500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // когда ширина экрана >= 1160px (десктоп)
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
      },
    });
  } else if (sectionId === "tasks") {
    Object.assign(baseConfig, {
      spaceBetween: 20,
      slidesPerView: 1,
      direction: "horizontal",
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // когда ширина экрана >= 500px (планшеты)
        500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }

  new Swiper(swiperEl, baseConfig);
});
