const PROJECTS_MENU = document.body.querySelector("#projects-menu");
const PROJECTS_TOGGLER = document.body.querySelector("#projects-btn");

function openMenu() {
  PROJECTS_MENU.classList.add("open");
  PROJECTS_TOGGLER.classList.add("open");
  PROJECTS_MENU.classList.remove("close");
  PROJECTS_TOGGLER.classList.remove("close");
  document.body.addEventListener("click", closeMenu);
  document.body.addEventListener("touchmove", closeMenu);
}

function closeMenu() {
  PROJECTS_MENU.classList.remove("open");
  PROJECTS_TOGGLER.classList.remove("open");
  PROJECTS_MENU.classList.add("close");
  PROJECTS_TOGGLER.classList.add("close");
  document.body.removeEventListener("click", closeMenu);
  document.body.removeEventListener("touchmove", closeMenu);
}

PROJECTS_TOGGLER.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (PROJECTS_TOGGLER.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});
