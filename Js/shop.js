const nav_container = document.querySelector(".nav-container"),
  rating_box = Array.from(document.querySelectorAll(".rating"));

window.addEventListener("scroll", () => {
  // Change BackGround Of NavBar When Scrolling
  if (window.scrollY >= window.innerHeight * 0.7) {
    nav_container.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-back-color");
  } else {
    nav_container.style.backgroundColor = "rgba(255,255,255,0.7)";
  }
});

window.addEventListener("load", () => {
  // Coloring The Rating Stars
  rating_box.forEach((box) => {
    let rate = box.getAttribute("data-rate");
    let stars = Array.from(box.querySelectorAll("i"));
    for (let i = 0; i < rate; i++) {
      stars[i].style.color = "#F3950D";
    }
  });
});
