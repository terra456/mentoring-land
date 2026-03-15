import "./scripts/projects-menu.js";
import "./scripts/header-menu.js";
import "./styles/main.scss";

const cookieConsent = localStorage.getItem("cookie-consent");

if (cookieConsent !== "true") {
  const cookie = document.getElementById("cookie");
  const cookieBtn = cookie.querySelector("#cookieBtn");
  cookie.classList.add("show");
  const closeCookieHandler = () => {
    cookie.classList.remove("show");
    localStorage.setItem("cookie-consent", true);
    cookieBtn.removeEventListener("click", closeCookieHandler);
  };
  cookieBtn.addEventListener("click", closeCookieHandler);
}
