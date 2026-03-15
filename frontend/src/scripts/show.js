// Анимация появления блоков с карточками
const cardAppearTimeouts = new WeakMap();

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const cards = entry.target.querySelectorAll(".card");
      const delayMs = 300;

      const clearPending = () => {
        const pending = cardAppearTimeouts.get(entry.target);
        if (pending) {
          pending.forEach((id) => {
            window.clearTimeout(id);
          });
          cardAppearTimeouts.delete(entry.target);
        }
      };

      if (!entry.isIntersecting) {
        clearPending();
        cards.forEach((card) => {
          card.classList.remove("is-visible");
        });
        return;
      }

      clearPending();

      const timeouts = [];
      cards.forEach((card, index) => {
        const id = window.setTimeout(
          () => {
            card.classList.add("is-visible");
          },
          (index + 1) * delayMs,
        );
        timeouts.push(id);
      });

      cardAppearTimeouts.set(entry.target, timeouts);
    });
  },
  { threshold: 0.2 },
); // 20% секции должно быть видно

const sectionsWithCards = document.querySelectorAll(
  ".next-step_conteiner, .mentor_conteiner, .approach_conteiner",
);

sectionsWithCards.forEach((section) => {
  cardObserver.observe(section);
});
