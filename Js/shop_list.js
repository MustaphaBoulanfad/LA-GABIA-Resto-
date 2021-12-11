const nav_container = document.querySelector(".nav-container"),
  rating_stars = Array.from(document.querySelectorAll(".rating")),
  specific_holder = document.querySelector(
    ".food-slider .holder .specific-slider"
  ),
  select_slider = document.querySelector(".food-slider .select-slider"),
  select_images = Array.from(
    select_slider.querySelectorAll(".select-slider img")
  );

let index_slide = 0,
  specific_width = specific_holder.firstElementChild.offsetWidth,
  select_width = select_slider.firstElementChild.offsetWidth;
window.addEventListener("scroll", () => {
  // CHange Backgorund Color Of Nav When Scrolling
  if (window.scrollY >= window.innerHeight * 0.7) {
    nav_container.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-back-color");
  } else {
    nav_container.style.backgroundColor = "rgba(255,255,255,0.5)";
  }
});

window.addEventListener("load", () => {
  // Change Color Of Rating Stars
  rating_stars.forEach((star) => {
    let rate = star.getAttribute("data-rate");
    let stars = Array.from(star.querySelectorAll("i"));
    for (let i = 0; i < rate; i++) {
      stars[i].style.color = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--main-color");
    }
  });
});

window.addEventListener("resize", () => {
  // Redefine The Values Of Elements Width To Avoid The Gap When Sliding
  specific_width = specific_holder.firstElementChild.offsetWidth;
  select_width = select_slider.firstElementChild.offsetWidth;
});

// Func To Change The Selected Image
const change_active = () => {
  select_images.forEach((img) => {
    img.classList.remove("active");
  });
  // Check For The Index If It Reach The End Of Slider On Not
  if (index_slide <= 3) {
    select_images[index_slide].classList.add("active");
  } else {
    index_slide = 0;
    select_images[index_slide].classList.add("active");
  }
};

// Func For Sliding
const food_slide_func = () => {
  index_slide++;
  index_click = index_slide;
  change_active();

  specific_holder.style.transform = `translateX(-${specific_width}px)`;

  // Translate The Holder Of Select Image When The Index Near To End
  if (index_slide >= 2) {
    select_slider.style.transform = `translateX(-${select_width + 15}px)`;
  } else {
    select_slider.style.transform = `translateX(0)`;
  }
};

specific_holder.addEventListener("transitionend", () => {
  // Add The First Image Of Specific Slider In The Last
  specific_holder.style.transition = "none";
  let first = specific_holder.firstElementChild;
  specific_holder.firstElementChild.remove();
  specific_holder.style.transform = `translateX(0)`;
  specific_holder.appendChild(first);
  setTimeout(() => {
    specific_holder.style.transition = "transform 0.6s ease";
  });
});

// Execute The Func Every 2s
let slide_interval = setInterval(food_slide_func, 2000);
