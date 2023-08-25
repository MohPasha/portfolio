let images = Array.from(document.querySelectorAll(".slider .images img"));
let imagesCount = images.length;

// create ul and li
for (let i = 1; i <= imagesCount; i++) {
  document.querySelector(
    ".controls .bulletsSpan ul"
  ).innerHTML += `<li data-index = ${i}>${i}</li>`;
}

let bullets = Array.from(
  document.querySelectorAll(".controls .bulletsSpan ul li")
);

let curentSlide = 1;

// autoSlide();
check();

let inter = setInterval(() => {
  curentSlide++;
  if (curentSlide === imagesCount + 1) {
    curentSlide = 1;
  }
  check();
}, 2500);

// Check Function
function check() {
  images.forEach((image) => {
    // Add slide number to slide span
    document.querySelector(
      ".images span"
    ).innerHTML = `Slide #${curentSlide} of ${imagesCount}`;

    if (images.indexOf(image) == curentSlide - 1) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });

  // Add class active to bullet

  bullets.forEach((bullet) => {
    if (bullets.indexOf(bullet) == curentSlide - 1) {
      bullet.classList.add("active");
    } else {
      bullet.classList.remove("active");
    }
  });

  // Disable and undisable next btn
  if (curentSlide === imagesCount) {
    document.querySelector(".controls .next").classList.add("disabled");
  } else {
    document.querySelector(".controls .next").classList.remove("disabled");
  }

  // Disable and undisable prev btn
  if (curentSlide == 1) {
    document.querySelector(".controls .prev").classList.add("disabled");
  } else {
    document.querySelector(".controls .prev").classList.remove("disabled");
  }
}

// next slide on click
document.querySelector(".controls .next").onclick = () => {
  if (curentSlide < imagesCount) {
    curentSlide++;
    check();
  } else {
    check();
  }
  clearInterval(inter);
};

// prev slide on click
document.querySelector(".controls .prev").onclick = () => {
  if (curentSlide > 1) {
    curentSlide--;
    check();
  } else {
    check();
  }
  clearInterval(inter);
};

// on click on bullets
bullets.forEach((bullet) => {
  bullet.onclick = () => {
    curentSlide = bullets.indexOf(bullet) + 1;
    check();
  };
});

// auto slide show
function autoSlide(i) {
  check();
  setInterval(() => {
    curentSlide++;
    if (curentSlide === imagesCount + 1) {
      curentSlide = 1;
    }
    check();
  }, 2500);
}
