class ModalManager {
  constructor() {
    this.modal = document.getElementById("modal");
    this.modalContent = document.getElementById("modalContent");
    this.modalTitle = document.getElementById("modalTitle");
    this.overlay = document.getElementById("modalOverlay");
    this.closeBtn = document.getElementById("modalClose");

    // Кэш для загруженных страниц
    this.contentCache = new Map();

    this.init();
    this.bindEvents();
  }

  init() {
    // Предзагрузка CSS для контента (опционально)
  }

  bindEvents() {
    // Закрытие по кнопке
    this.closeBtn.addEventListener("click", () => this.close());

    // Закрытие по оверлею
    this.overlay.addEventListener("click", () => this.close());

    // Закрытие по ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    // Открытие модалки по клику на триггеры
    document.querySelectorAll(".modal-trigger").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const content = trigger.dataset.content;
        const title = trigger.dataset.title || this.getTitleByContent(content);
        this.open(content, title);
      });
    });

    // Обработка истории браузера
    window.addEventListener("popstate", (event) => {
      if (event.state?.modal) {
        this.open(event.state.content, event.state.title, false);
      } else {
        this.close(false);
      }
    });
  }

  getTitleByContent(content) {
    const titles = {
      details: "Подробная информация",
      gallery: "Галерея",
      contacts: "Контакты",
      about: "О нас",
    };
    return titles[content] || "Информация";
  }

  async open(contentType, title = null, updateHistory = true) {
    // Показываем загрузку
    this.showLoading();

    // Устанавливаем заголовок
    if (title) {
      this.modalTitle.textContent = title;
    }

    // Открываем модалку
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";

    try {
      // Загружаем контент
      await this.loadContent(contentType);

      // Обновляем историю браузера
      if (updateHistory) {
        history.pushState(
          {
            modal: true,
            contentType,
            title,
          },
          "",
          `#${contentType}`,
        );
      }
    } catch (error) {
      console.error("Ошибка загрузки контента:", error);
      this.modalContent.innerHTML = `
                <div class="error-message">
                    <h3>Ошибка загрузки</h3>
                    <p>Не удалось загрузить контент. Пожалуйста, попробуйте позже.</p>
                    <button class="retry-btn" onclick="window.modalManager.retryLoad('${contentType}')">Повторить</button>
                </div>
            `;
    }
  }

  async loadContent(contentType) {
    // Проверяем кэш
    if (this.contentCache.has(contentType)) {
      this.modalContent.innerHTML = this.contentCache.get(contentType);
      this.loadContentScripts(contentType);
      return;
    }

    // Загружаем HTML контент
    const response = await fetch(`/content/${contentType}.html`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Сохраняем в кэш
    this.contentCache.set(contentType, html);

    // Вставляем контент
    this.modalContent.innerHTML = html;

    // Загружаем скрипты для этого контента (если нужны)
    this.loadContentScripts(contentType);
  }

  loadContentScripts(contentType) {
    // Динамическая загрузка JS для контента
    const script = document.createElement("script");
    script.src = `/content-scripts/${contentType}.js`;
    script.onload = () => {
      // Запускаем инициализацию контента, если есть
      if (window.contentModules && window.contentModules[contentType]) {
        window.contentModules[contentType].init();
      }
    };
    document.body.appendChild(script);
  }

  showLoading() {
    this.modalContent.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Загрузка...</p>
            </div>
        `;
  }

  close(updateHistory = true) {
    this.modal.classList.remove("active");
    document.body.style.overflow = "";

    // Очищаем контент (опционально, чтобы не занимать память)
    // this.modalContent.innerHTML = '';

    if (updateHistory && history.state?.modal) {
      history.back();
    }
  }

  isOpen() {
    return this.modal.classList.contains("active");
  }

  retryLoad(contentType) {
    this.loadContent(contentType);
  }
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  window.modalManager = new ModalManager();
});
