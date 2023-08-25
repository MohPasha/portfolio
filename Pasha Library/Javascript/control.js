let headerBars = document.querySelector("header .container .more"),
  headerUl = document.querySelector("header .container > ul"),
  headerUlCloser = document.querySelector("header .container ul .close");
headerBars.onclick = () => {
  headerUl.classList.add("view");
};
headerUlCloser.onclick = () => {
  headerUl.classList.remove("view");
};
document.onkeyup = (key) => {
  if (key.key === "Escape") {
    headerUl.classList.remove("view");
  }
};

window.onload = () => {
  if (!localStorage.getItem("pasha-lib-night")) {
    localStorage.setItem("pasha-lib-night", "light");
  }
  document.body.className = localStorage.getItem("pasha-lib-night");
};

let nightSwitcher = document.querySelector("header #night-switcher");
nightSwitcher.onclick = () => {
  if (localStorage.getItem("pasha-lib-night") === "light") {
    document.body.className = "night";
    localStorage.setItem("pasha-lib-night", "night");
  } else if (localStorage.getItem("pasha-lib-night") === "night") {
    document.body.className = "light";
    localStorage.setItem("pasha-lib-night", "light");
  }
};
