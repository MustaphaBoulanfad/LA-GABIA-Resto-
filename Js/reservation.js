let nav_container = document.querySelector(".nav-container"),
  header = document.querySelector("header");

window.addEventListener("scroll", () => {
  // Change Backgroun Color Of Nav On scroll
  if (window.scrollY >= window.innerHeight * 0.7) {
    nav_container.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-back-color");
  } else {
    nav_container.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  }
});
