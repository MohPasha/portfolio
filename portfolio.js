// increase skills progress
let skills = document.querySelector(".skills"),
  skillsProgressSpan = document.querySelectorAll(
    ".skills .container .progress span"
  );
window.onscroll = function () {
  skillsProgressSpan.forEach((span) => {
    if (window.scrollY >= skills.offsetTop - 250) {
      span.style.width = span.getAttribute("progress");
      span.classList.add("active");
    } else {
      span.style.width = "0%";
      span.classList.remove("active");
    }
  });
  scroller(projects, 300);
};
// filter projects
let tabs = document.querySelectorAll(".projects .tabs li"),
  projects = document.querySelectorAll(".projects .all");

tabs.forEach((tab) => {
  tab.onclick = () => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    for (let project of projects) {
      if (!project.classList.contains(tab.getAttribute("tab"))) {
        project.classList.add("d-none");
      } else {
        project.classList.remove("d-none");
      }
    }
  };
});

function scroller(elements, num = 0) {
  elements.forEach((element) => {
    if (window.scrollY >= element.offsetTop - num) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}
