let nav_container = document.querySelector(".nav-container"),
  header = document.querySelector("header"),
  menu_items = Array.from(document.querySelectorAll(".menu-container .item")),
  filter_items = Array.from(document.querySelectorAll(".filter span"));

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

// Show The Add On Menu Item
menu_items.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.querySelector(".add").style.bottom = "0";
    item.querySelector(".image img").style.transform = "scale(1.1,1.1)";
  });
  item.addEventListener("mouseleave", () => {
    item.querySelector(".add").style.bottom = "-100%";
    item.querySelector(".image img").style.transform = "scale(1,1)";
  });
});

// Filtring Menu
filter_items.forEach((filter) => {
  filter.addEventListener("click", () => {
    filter_items.forEach((filter) => {
      filter.classList.remove("active");
    });
    if (filter.className === "all") {
      menu_items.forEach((item) => {
        item.style.display = "inline-block";
      });
    } else {
      menu_items.forEach((item) => {
        if (!item.classList.contains(filter.className)) {
          item.style.display = "none";
        } else {
          item.style.display = "inline-block";
        }
      });
    }
    filter.classList.add("active");
  });
});
