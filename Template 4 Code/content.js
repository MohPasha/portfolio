document.head.innerHTML += `
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/normalize.css">
    <link rel="stylesheet" href="./css/framework.css">
    <link rel="stylesheet" href="./css/temp4.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>Template 4</title>
    `;
document.getElementById("aside").innerHTML = `
    <div class="img txt-center">
        <img src="./imgs/logo colored.png" alt="" class="p-realtive">
    </div>
    <ul class="pat-1">
        <li>
            <a href="index.html" class="d-flex c-black rad-2 pa-05 f-size-07" id="dashboard">
                <i class="fa-regular fa-chart-bar fa-fw c-main par-1"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <li>
            <a href="settings.html" class="d-flex c-black rad-2 pa-05 f-size-07" id="settings">
                <i class="fa-solid fa-gear fa-fw c-main"></i>
                <span>Settings</span>
            </a>
        </li>
        <li>
            <a href="profile.html" class="d-flex c-black rad-2 pa-05 f-size-07" id="profile">
                <i class="fa-regular fa-user fa-fw c-main"></i>
                <span>Profile</span>
            </a>
        </li>
        <li>
            <a href="projects.html" class="d-flex c-black rad-2 pa-05 f-size-07" id="projects">
                <i class="fa-solid fa-diagram-project fa-fw c-main"></i>
                <span>Projects</span>
            </a>
        </li>
        <li>
            <a href="courses.html" class="d-flex c-black rad-2 pa-05 f-size-07" id="courses">
                <i class="fa-solid fa-graduation-cap fa-fw c-main"></i>
                <span>Courses</span>
            </a>
        </li>
        <li>
            <a href="friends.html" class="d-flex d-flex c-black rad-2 pa-05 f-size-07" id="friends">
                <i class="fa-regular fa-circle-user fa-fw c-main"></i>
                <span>Friends</span>
            </a>
        </li>
        <li>
            <a href="files.html" class="d-flex c-black rad-2 pa-05 f-size-07" id="files">
                <i class="fa-regular fa-file fa-fw c-main"></i>
                <span>Files</span>
            </a>
        </li>
        <li>
            <a href="plans.html" class="d-flex c-black rad-2 pa-05 f-size-07" id="plans">
                <i class="fa-regular fa-credit-card fa-fw c-main"></i>
                <span>Plans</span>
            </a>
        </li>
    </ul>
`;
document.getElementById("header").innerHTML = `

        <!-- Search Bar Start -->
        <div class="search p-realitive">
            <input class="f-size-07 rad-2" type="search" placeholder="Type A Keyword">
        </div>
        <!-- Search Bar End -->
        <!-- Header Icons Start -->
        <div class="icons d-flex">
            <i class="fa-regular fa-bell fa-lg p-realitive par-05"></i>
            <a href="profile.html">
                <img src="imgs/avatar.jpg" class="rad-50">
            </a>
        </div>
        <!-- Header Icons End -->
        <i class="far fa-user open" id="openpashaProfile"></i>
        <div class="pashaProfile">
            <div class="content">
                <i class="fas fa-times close"></i>
                <h3 class="box-h3">Developed By: <span>Pasha </span><span>Developer</span></h3>
                <p class="box-p">06/07/2023</p>
                <h4>Made With:</h4>
                <div class="skills">
                    <span>HTML5</span>
                    <span>CSS3</span>
                    <span>Javascript</span>
                    <span>Font Awesome</span>
                    <span>Custom Framework</span>
                </div>
                <a href="https://mohpasha.github.io/portfolio/">Our Portfolio <i class="fas fa-external-link"></i></a>
            </div>
        </div>
`;
let pageName = document.getElementById("pageName").textContent;
window.onload = function () {
  document.getElementById(pageName).classList.add("active");

  // Control On pashaProfile Menu
  let pashaProfile = document.querySelector(".pashaProfile");
  let closeBtn = document.querySelector(".pashaProfile .close");
  let openBtn = document.querySelector("#openpashaProfile");

  openBtn.onclick = () => {
    pashaProfile.classList.toggle("show");
  };
  closeBtn.onclick = () => {
    pashaProfile.classList.remove("show");
  };
};
