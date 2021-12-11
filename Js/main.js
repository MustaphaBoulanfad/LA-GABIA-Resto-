let nav_mobile = document.querySelector(".nav-mobile"),
  show_nav_mobile = document.querySelector(".showNav-mobile"),
  show_cart = document.querySelector(".shop-card");

// Show NavBar in Mobile
show_nav_mobile.addEventListener("click", () => {
  nav_mobile.classList.toggle("showed");
  show_nav_mobile.classList.toggle("fa-times-circle");
});

// Show The Cart On Mobile
show_cart.addEventListener("click", () => {
  let cart = show_cart.querySelector(".card");
  if (window.innerWidth > 890) {
    cart.classList.remove("show-cart");
    return;
  }
  cart.classList.toggle("show-cart");
});
