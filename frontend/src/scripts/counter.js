const counterState = new WeakMap();

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const counts = entry.target.querySelectorAll(".count");
      const durationMs = 2000;

      if (!entry.isIntersecting) return;

      counts.forEach((count) => {
        const target = Number(count.textContent);
        if (Number.isNaN(target)) return;

        let state = counterState.get(count);
        if (!state) {
          const start = Math.max(0, target - 20);
          state = {
            current: start,
            target,
            timerId: null,
            finished: false,
          };
          count.textContent = start;
          counterState.set(count, state);
        }

        if (state.finished) return;
        if (state.timerId) return; // already running

        const remaining = state.target - state.current;
        const delay = durationMs / Math.max(remaining, 1);

        state.timerId = window.setInterval(() => {
          state.current += 1;
          count.textContent = state.current;
          if (state.current >= state.target) {
            window.clearInterval(state.timerId);
            state.timerId = null;
            state.finished = true;
          }
        }, delay);
      });
    });
  },
  { threshold: 0.1 },
);

const initCounterObserver = () => {
  const sectionsWithCount = document.querySelector(".result_numbers");
  if (!sectionsWithCount) return false;

  counterObserver.observe(sectionsWithCount);
  return true;
};

if (!initCounterObserver()) {
  window.addEventListener("DOMContentLoaded", () => {
    initCounterObserver();
  });
}
