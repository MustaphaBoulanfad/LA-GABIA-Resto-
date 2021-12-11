const nav_container = document.querySelector(".nav-container"),
  progress = Array.from(document.querySelectorAll("table tr td .progress")),
  direction_list = Array.from(document.querySelectorAll(".direction ul li")),
  rating = Array.from(document.querySelectorAll(".rating")),
  featured_holder = document.querySelector(".recipe-container .holder"),
  navigation = document.querySelector(".navigation ul");

let index_direction_items = 0,
  navigation_bullets = Array.from(
    document.querySelectorAll(".navigation ul li")
  );

// Add Or Remove The Navigation Bullet
const check_featured_navigation = () => {
  // Remove classes Show & Active From All Bullets
  navigation.querySelectorAll("li").forEach((li) => {
    li.classList.remove("show");
    li.classList.remove("active");
  });
  // Add The Class Active To The First Bullet Every Time This Func Triggred
  navigation_bullets[0].classList.add("active");

  // Check The Width Of Window & Add Bullets Depend On The width
  if (window.innerWidth <= 576) {
    for (let i = 0; i <= 5; i++) {
      navigation_bullets[i].classList.add("show");
    }
  } else if (window.innerWidth >= 992) {
    for (let i = 0; i <= 2; i++) {
      navigation_bullets[i].classList.add("show");
    }
  } else {
    for (let i = 0; i <= 4; i++) {
      navigation_bullets[i].classList.add("show");
    }
  }

  // Make The Holder Return To First
  featured_holder.style.transform = `translateX(0)`;
};

window.addEventListener("load", () => {
  check_featured_navigation();
});

window.addEventListener("scroll", () => {
  // Change Background Color Of Nav On scroll
  if (window.scrollY >= window.innerHeight * 0.7) {
    nav_container.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-back-color");
  } else {
    nav_container.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  }
});

window.addEventListener("resize", () => {
  check_featured_navigation();
});

// Change The Progress bar By Contribution Of Percentage
progress.forEach((prog) => {
  let much = prog.querySelector(".much");
  let percent = parseInt(prog.previousElementSibling.innerHTML.split("%")[0]);
  much.style.width = `${percent * 10}%`;
});

// Write The Number Inside Of Pseudo Elements Of Direction Liste
direction_list.forEach((item) => {
  item.setAttribute("data-pseudo", ++index_direction_items);
});

// Coloring The Rating Stars
rating.forEach((rate) => {
  let stars = Array.from(rate.querySelectorAll("i"));
  let data_rate = rate.getAttribute("data-rate");
  for (let i = 0; i < data_rate; i++) {
    stars[i].style.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-color");
  }
});

// Slide Featured
navigation_bullets.forEach((bullet) => {
  // Remove Class Active From All Bullets
  bullet.addEventListener("click", () => {
    navigation_bullets.forEach((li) => {
      li.classList.remove("active");
    });

    // Get The width Of The Card
    let width =
      document.querySelector(".recipe-container .holder a").offsetWidth + 20;

    if (window.innerWidth <= 576) {
      width -= 20;
    }
    let index = bullet.getAttribute("data-index");
    featured_holder.style.transform = `translateX(-${width * index}px)`;
    bullet.classList.add("active");
  });
});
