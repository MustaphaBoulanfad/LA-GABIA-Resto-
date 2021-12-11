const nav_container = document.querySelector(".nav-container"),
  all_find_image = Array.from(
    document.querySelectorAll(".show-images .image .find")
  ),
  showing = document.querySelector(".show"),
  count = document.querySelector(".show .content .count"),
  close = document.querySelector(".show .content .close"),
  buttons_navigation = Array.from(document.querySelectorAll(".content > i"));

let index,
  showed = false;

// Func To Show The Number Of Image Each Time The Src Is Change
const changingCounting = () => {
  count.innerHTML = `${index} of ${all_find_image.length}`;
};

// Func To Close Image
const closeShowImage = () => {
  showing.style.opacity = 0;
  showing.style.zIndex = -1;
  showed = false;
};

// Change Image When Click On Nav Buttons
const changingImageButtons = (direction) => {
  // X Equals 1 Or -1, To Add It That Makes It Increase Or Decrease Depands On Direction
  let x;
  direction === "left" ? (x = -1) : (x = 1);

  // Get All Images And Loop On It To get The Previous Or Next Image To The Current Image
  const images = Array.from(
    document.querySelectorAll(".show-images .images .image img")
  );
  index += x;
  images.forEach((image) => {
    if (parseInt(image.getAttribute("data-number")) === index) {
      showing.querySelector(".content img").src = image.src;
    }
  });
  CheckIndex();
  changingCounting();
};

// Check If The Image Reach The Beginning Or The End
const CheckIndex = () => {
  if (index === 12) {
    buttons_navigation[1].classList.add("stop");
  } else if (index === 1) {
    buttons_navigation[0].classList.add("stop");
  } else {
    buttons_navigation[0].classList.remove("stop");
    buttons_navigation[1].classList.remove("stop");
  }
};

window.addEventListener("scroll", () => {
  // Change Background Color Of Nav When Scrolling
  if (window.scrollY >= window.innerHeight * 0.7) {
    nav_container.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-back-color");
  } else {
    nav_container.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  }
});

// Adding Event Click On Find Dev Because It Is Up Of Image, Just It Have Opacity 0
all_find_image.forEach((find) => {
  find.addEventListener("click", () => {
    // Get The Src Of Image And Number
    let src = find.parentElement.querySelector("img").getAttribute("src");
    index = parseInt(
      find.parentElement.querySelector("img").getAttribute("data-number")
    );
    showed = true;

    showing.querySelector(".content img").src = src;
    showing.style.zIndex = 6;
    setTimeout(() => {
      showing.style.opacity = 1;
    });
    CheckIndex();
    changingCounting();
  });
});

// Hide The Show After Click Close Btn
close.addEventListener("click", () => {
  closeShowImage();
});

// Add Click Event To The Nav Buttons
buttons_navigation.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // Stop The Execution If The Button Have Class..
    // ..Stop => Means That We Are In The First Or Last
    if (btn.classList.contains("stop")) {
      event.preventDefault();
    } else if (btn.classList.contains("left")) {
      changingImageButtons("left");
    } else {
      changingImageButtons("right");
    }
  });
});
