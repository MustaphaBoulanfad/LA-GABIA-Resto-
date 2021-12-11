const nav_container = document.querySelector(".nav-container"),
  service_container = document.querySelector(".service-container"),
  holder_service = document.querySelector(".service-container .holder"),
  navigations = Array.from(
    document.querySelectorAll(".service-container .navigation ul li")
  ),
  quotes_container = document.querySelector(".quotes-container"),
  holder_quotes = document.querySelector(".quotes-container .holder");
(quotes_navigations = Array.from(
  document.querySelectorAll(".quotes .navigation ul li")
)),
  (filter_menu_button = Array.from(document.querySelectorAll(".filter span"))),
  (menu_items = Array.from(document.querySelectorAll(".menu-items .item")));
// Var To Scroll in Special Service
let isDown = false,
  startX;

// Var For Quotes Slider
let index = 0;

window.addEventListener("scroll", () => {
  // Change color Of Nav When Scrolling
  if (window.scrollY >= window.innerHeight * 0.7) {
    nav_container.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-back-color");
  } else {
    nav_container.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    // To Make The Services Return To The Normal Position When Changing Width Of Screen
    holder_service.style.left = "0px";
  }
});

service_container.addEventListener("mouseenter", (event) => {
  // Change The Cursor
  if (window.innerWidth >= 768) {
    holder_service.style.cursor = "default";
  } else {
    holder_service.style.cursor = "pointer";
  }
});
service_container.addEventListener("mousedown", (event) => {
  if (window.innerWidth > 768) return;
  isDown = true;
  startX = event.pageX - holder_service.offsetLeft; // Get Clicked Point
  holder_service.classList.add("active");
});

service_container.addEventListener("mouseleave", () => {
  isDown = false;
  holder_service.classList.remove("active");
});

service_container.addEventListener("mouseup", () => {
  isDown = false;
  holder_service.classList.remove("active");
  bounding();
});

service_container.addEventListener("mousemove", (event) => {
  if (!isDown) return; //Stop The Function from Running
  event.preventDefault(); //Stop Every select of Text or something Like That
  holder_service.style.left = `${event.offsetX - startX}px`;
  bounding();
});

const bounding = () => {
  const holder_rect = holder_service.getBoundingClientRect(),
    container_rect = service_container.getBoundingClientRect();

  // Check If The Holder is Out of Container And Reset It
  if (parseInt(holder_service.style.left) > 0) {
    holder_service.style.left = "0px";
  } else if (holder_rect.right < container_rect.right) {
    holder_service.style.left = `-${
      holder_rect.width - container_rect.width
    }px`;
  }
};

navigations.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    // Removing Active Class From The Previous Nav
    navigations.forEach((nav) => {
      nav.classList.remove("active");
    });
    nav.classList.add("active");

    let number = nav.getAttribute("data-number");
    if (number === "0") {
      holder_service.style.left = `0px`;
    } else {
      holder_service.style.left = `-${holder_service.offsetWidth / 2}px`;
    }
  });
});

// Slide The Quote Each 1.5s
let slider_quotes_interval = setInterval(() => {
  slide_quotes_func();
}, 1500);

quotes_navigations.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    index = parseInt(event.target.attributes["data-number"].value);
    // Clear The Interval To Stop Sliding
    clearInterval(slider_quotes_interval);
    holder_quotes.style.transform = `translate(-${25 * index}%)`;
    slider_quotes_interval = setInterval(() => {
      slide_quotes_func();
    }, 1500);

    quotes_navigations.forEach((nav) => {
      nav.classList.remove("active");
    });
    quotes_navigations[index === 3 ? 0 : index].classList.add("active");
  });
});

const slide_quotes_func = () => {
  index++;
  // Check If Sliding Reach The Last quote
  if (index > 3) {
    holder_quotes.style.transition = "none";
    holder_quotes.style.transform = "translate(0)";
    index = 0;
    setTimeout(
      () => (holder_quotes.style.transition = " transform 0.6s ease-in")
    );
  }
  holder_quotes.style.transform = `translate(-${25 * index}%)`;
  // delete Class Active From All The Navigation Button
  quotes_navigations.forEach((nav) => {
    nav.classList.remove("active");
  });
  // Checking if The Index is The Last One, If It Is replace It With 0
  quotes_navigations[index === 3 ? 0 : index].classList.add("active");
};

// Stop and Start The Sliding When Mouse Enter Or Leave The Container Of Quotes
quotes_container.addEventListener("mouseenter", () => {
  clearInterval(slider_quotes_interval);
});
quotes_container.addEventListener("mouseleave", () => {
  slider_quotes_interval = setInterval(() => {
    slide_quotes_func();
  }, 1500);
});

// Filtring Menu
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
