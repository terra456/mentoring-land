// Модуль для детальной страницы
(() => {
  // Создаем пространство имен для контент-модулей
  window.contentModules = window.contentModules || {};

  window.contentModules.details = {
    init: function () {
      console.log("Детальная страница инициализирована");
      this.bindEvents();
      this.loadGallery();
    },

    bindEvents: function () {
      // Обработка кликов по миниатюрам
      const thumbnails = document.querySelectorAll(".thumbnails img");
      const mainImage = document.querySelector(".main-image");

      thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", (e) => {
          if (mainImage) {
            mainImage.src = e.target.src;
            mainImage.alt = e.target.alt;
          }
        });
      });

      // Анимация при загрузке
      this.animateElements();
    },

    loadGallery: () => {
      // Дополнительная логика для галереи
      console.log("Галерея загружена");
    },

    animateElements: () => {
      const features = document.querySelectorAll(".feature-item");
      features.forEach((feature, index) => {
        feature.style.opacity = "0";
        feature.style.transform = "translateY(20px)";

        setTimeout(() => {
          feature.style.transition = "all 0.5s ease";
          feature.style.opacity = "1";
          feature.style.transform = "translateY(0)";
        }, 100 * index);
      });
    },
  };
})();
