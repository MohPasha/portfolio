// Add Page Head
document.head.innerHTML += `
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>مكتبة اللغة العربية</title>
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="css/framework.css">
<link rel="stylesheet" href="css/library.css">
`;
// Add The Header And Main Contianer To The Page
document.body.innerHTML += `
<!-- Header Start -->
<header class="bg-white pat-05 pab-05 w-full main-shadow">
    <div class="container  between-flex">
        <div class="center-all">
            <i class="far fa-moon d-flex-center justify-center rad-50 c-white" id="night-switcher"></i>
        </div>
        <a href="index.html">
            <img src="pics/logo colored.png" alt="">
        </a>
        <i class="fas fa-bars more"></i>
        <ul class="text">
            <li id="She3r"><a href="She3r.html">الشعر</a></li>
            <li id="Adab"><a href="Adab.html">الأدب</a></li>
            <li id="Naho"><a href="Naho.html">النحو والصرف</a></li>
            <li id="Balaga"><a href="Balaga.html">البلاغة والنقد</a></li>
            <li id="Loga"><a href="Loga.html">اللغة</a></li>
            <li id="Ma3agim"><a href="Ma3agim.html">المعاجم</a></li>
            <li id="Tragim"><a href="Tragim.html">التراجم</a></li>
            <li id="Aaroudh"><a href="Aaroudh.html">العروض والقوافي</a></li>
            <i class="close far fa-times-circle c-black p-abs"></i>
        </ul>
    </div>
</header>
<!-- Header End -->
<!-- Main Content Start -->
<main class="page" id="page">
</main>
<!-- Main Content End -->
`;
// Get The Page Name From Invisible Div Which Is Contains Page Name
let pageName = document.getElementById("pageName").textContent;
// Add Class (active) To Page Name On List
document.getElementById(pageName).className = "active";
// Get The Books Container
let booksContainer = document.getElementById("content");
// Start New Http Request
let http = new XMLHttpRequest();
// Open The Json File
http.open("get", "jsons/main.json", true);
http.send();
// Main Function
http.onload = function () {
  // If Get Data From Json File Successed
  if (this.readyState == 4 && this.status == 200) {
    // store the json content on variable
    let data = JSON.parse(this.responseText);
    // empty variable to save main content
    let content = "";
    // empty variable to save links content
    let linksContent = "";
    // empty variable to save books content
    let books = "";
    for (section of data[`${pageName}`]) {
      // get the sections of page name part on json
      function showBooks() {
        // reset books content after one loop
        books = "";
        // get the book on section
        for (let item of section.content) {
          // get links for  the book
          function getLinks() {
            // loop on all links
            for (let link of item.links) {
              // add the link to content
              linksContent += `
                        <a href="${link}" class="button f-07 d-flex justify-center">الملف ${
                item.links.indexOf(link) + 1
              } <i class="fas fa-download par-05"></i></a>`;
            }
          }
          getLinks();
          // add the books with ther links
          books += `            <div class="book p-realtive">
                    <div class="data card d-flex justify-sb">
                        <div class="text d-flex-c justify-sb">
                            <h3 class="box-h3 mab-05">${item.name}</h3>
                            <p class="box-p">${item.author}</p>
                        </div>
                    ${
                      item.status === "available"
                        ? '<a class="button d-flex-c align-center f-07" href="#"> تحميل <i class="fas fa-download d-block"></i></a>'
                        : "<div class='f-07 d-flex-c align-center justify-center bg-grey rad-2 pa-05'>غير متوفر</div>"
                    }

                    </div>
                    <div class="links card d-none mat-1">
                        <h3 class="box-h3">عدد ملفات الكتاب: <span>${
                          item.links.length
                        }</span></h3>
                        <div class="content d-grid mat-1">
                    ${linksContent}${(linksContent = "")}
                </div>
                </div>
            </div>
                `;
        }
      }
      showBooks();
      // add the books to main content
      content += `
            <div class="container">
                <div class="page-title mat-1 mab-1"> ${section.sectionName}</div>
                <div class="content d-grid-4c gap-1" id="content">
    ${books}
                </div>
            </div>`;
    }
    // add the min content to the page
    document.getElementById("page").innerHTML += content;
    // get the button on the book section
    bookBtns = document.querySelectorAll(".container .book .data .button");
    // add function to all buttons
    bookBtns.forEach((btn) => {
      btn.onclick = () => {
        // on click on it show the sibling div whichis contains links
        btn.parentElement.nextElementSibling.classList.toggle("d-none");
      };
    });
  }
};
// Add The Footer
document.body.innerHTML += `
<!-- Contact Start -->
<footer class="contact bg-white w-full main-shadow d-flex-center justify-center">
    <div class="container c-white between-flex">
        <div class="text f-07 txt-c c-black bold">تصميم وتطوير <span class="c-main par-05 pal-05">أبي جعفر</span>غفر
            الله له ولوالديه.
        </div>
        <div class="icons txt-c d-flex-center justify-sa c-black">
            <a href="https://mohpasha.github.io/portfolio/" class="c-black f-1 par-05"><i
                    class="far fa-user"></i></a>
            <a href="https://wa.me/249111696468" class="c-black f-1 par-05"><i class="fab fa-whatsapp"></i></a>
            <a href="https://t.me/pasha216" class="c-black f-1 par-05"><i class="fab fa-telegram"></i></a>
            <a href="mailto:mohammedalhbyb@gmail.com" class="c-black f-1 par-05"><i class="fas fa-envelope"></i></a>
        </div>
    </div>
</footer>
<!-- Contact End -->
`;
