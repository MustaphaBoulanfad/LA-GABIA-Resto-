let nav_container = document.querySelector(".nav-container"),
  slider_images = Array.from(document.querySelectorAll(".slider-image")),
  all_images = Array.from(document.querySelectorAll(".show")),
  special_today_ul = document.querySelector(".holder ul"),
  holder = document.querySelector(".holder"),
  features = Array.from(document.querySelectorAll(".feature")),
  filter_menu_button = Array.from(document.querySelectorAll(".filter span")),
  menu_items = Array.from(document.querySelectorAll(".menu-items .item")),
  special_container = document.querySelector(".slider-container"),
  special_holder = document.querySelector(".slider-container .holder"),
  special_cards = Array.from(document.querySelectorAll(".card"));

window.addEventListener("scroll", () => {
  // Change background Color of Nav In Scroll
  if (window.scrollY >= window.innerHeight) {
    nav_container.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-back-color");
  } else {
    nav_container.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Slider Image
  let count = slider_images.length;
  let i = 0;
  const changeBackground = () => {
    setInterval(() => {
      slider_images.forEach((slider) => {
        slider.style.opacity = "0";
      });
      slider_images[i].style.opacity = "1";
      i++;
      if (i === count) i = 0;
      setTimeout(() => {
        changeBackground;
      }, 2500);
    }, 2500);
  };
  changeBackground();

  // Show Introduction Text In Reveal Way
  let showingIntroText = setTimeout(() => {
    let i = 0;
    let intro_elements = Array.from(document.querySelectorAll(".intro-text *"));
    let interval = setInterval(() => {
      intro_elements[i].classList.add("show");
      i++;
      if (i === intro_elements.length) clearInterval(interval);
    }, 500);
  }, 1500);
});

// Show Image When Click
all_images.forEach((image) => {
  image.addEventListener("click", (event) => {
    let url = image.style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];

    let show = document.createElement("div");
    show.classList.add("show-image");
    show.style.top = "0";

    let div = document.createElement("p");
    div.innerHTML = `<p class ="close"><i class = "fas fa-times"></i></p>`;

    let img = document.createElement("img");
    img.src = url;

    show.appendChild(div);
    show.appendChild(img);
    document.body.appendChild(show);
  });
});

// Close Image
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-times")) {
    let parent = event.target.parentElement.parentElement;
    parent.parentElement.remove();
  }
});

// Scale Image In feature
features.forEach((feature) => {
  feature.addEventListener("mouseenter", () => {
    let img = feature.children[0].firstElementChild;
    img.style.transform = "scale(1.2, 1.2)";
  });
  feature.addEventListener("mouseleave", () => {
    let img = feature.children[0].firstElementChild;
    img.style.transform = "scale(1, 1)";
  });
});

// Filtering Menu
filter_menu_button.forEach((button) => {
  let keyWord;
  button.addEventListener("click", (event) => {
    filter_menu_button.forEach((btn) => btn.classList.remove("active"));
    keyWord = button.className;
    menu_items.forEach((item) => {
      if (keyWord === "all") {
        item.style.display = "inline-block";
      } else if (!item.classList.contains(keyWord)) {
        item.style.display = "none";
      } else {
        item.style.display = "inline-block";
      }
    });
    button.classList.add("active");
  });
});

// Slider In Special Today
special_holder.addEventListener("transitionend", () => {
  special_holder.appendChild(special_holder.firstElementChild);
  special_holder.style.transition = "none";
  special_holder.style.transform = "translate(0)";
  setTimeout(() => (special_holder.style.transition = " transform 1.4s ease"));
});

let slide_interval = setInterval(() => {
  special_holder.style.transform = "translate(-25%)";
  special_container.style.justifyContent = "flex-start";
}, 5000);
