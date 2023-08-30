// main variables to set words and letters
let letters;
let allWords;

// set words and letter by laguage
if (document.body.id === "arabic") {
  letters = "أإابتثجحخدذرزسشصضطظعغفقكلمنهةويئ";
  // Set Words
  allWords = {
    تطبيقات: [
      "فيسبوك",
      "واتساب",
      "تويتر",
      "تيليجرام",
      "يوتيوب",
      "اسكايب",
      "لينكدإن",
      "إنستجرام",
    ],
    هواتف: ["أبل", "سامسونج", "هواوي", "نوكيا", "موتورولا", "شاومي"],
    سيارات: [
      "فيراري",
      "هوندا",
      "تويوتا",
      "مرسيدس",
      "لامبورجيني",
      "فورد",
      "ليكزس",
      "رولزرويس",
      "كيا",
    ],
    دول: [
      "السودان",
      "مصر",
      "اليمن",
      "فلسطين",
      "سوريا",
      "العراق",
      "عمان",
      "قطر",
      "الجزائر",
      "تونس",
      "الأردن",
      "الإمارات",
      "السعودية",
      "ليبيا",
      "المغرب",
      "البحرين",
      "موريتانيا",
      "الصومال",
      "جيبوتي",
    ],
  };
} else if (document.body.id === "english") {
  letters = "abcdefghijklmnopqrstuvwxyz";
  // Set Words
  allWords = {
    apps: [
      "whatsapp",
      "facebook",
      "twitter",
      "telegram",
      "youtube",
      "skype",
      "linkedin",
      "instagram",
    ],
    mobiles: [
      "apple",
      "samsung",
      "huawei",
      "oppo",
      "nokia",
      "redmi",
      "realmi",
      "infinix",
    ],
    // cars : ['mercedss'],
    countries: [
      "sudan",
      "egypt",
      "yemen",
      "palestine",
      "syria",
      "iraq",
      "oman",
      "qatar",
      "algeria",
      "tunisia",
      "jordan",
      "united emarites",
      "saudi arabia",
      "libya",
      "moroco",
    ],
  };
}

// the draw
let draw = document.querySelector(".draw");
// set rray from letters
let lettersArr = Array.from(letters);
// get letters container
let lettersContainer = document.querySelector(".letters .content");
// set variable to show the letters on html
let lettersContainerSpans;
// reset wrongs count
let wrongs = 0;
// set finished var to control fnish message
let finished;
// set variable to show the word on html
let wordContainerSpans;
// Add Letters
lettersArr.forEach((letter) => {
  lettersContainer.innerHTML += `<span class="letter">${letter}<span>`;
});

// get random word from random key elements
let wordsKeys;
let randKeyNum;
let randKey;
let randWordNum;
let randWord;
let randomWordArr;
let wordContainer;
// category : key
let category;
// get random word from random key function
function setRandWord() {
  // get random key
  wordsKeys = Object.keys(allWords);
  randKeyNum = Math.floor(Math.random() * wordsKeys.length);
  randKey = allWords[wordsKeys[randKeyNum]];
  category = document.querySelector(".category span");
  category.innerHTML = wordsKeys[randKeyNum];
  // get random word from random key
  randWordNum = Math.floor(Math.random() * randKey.length);
  randWord = randKey[randWordNum];
  randomWordArr = Array.from(randWord);
  wordContainer = document.querySelector(".wordshow");
  // add empty spans to words container which will be full by letters
  randomWordArr.forEach((letter) => {
    // if letter is space add a class to its span
    if (letter == " ") {
      wordContainer.innerHTML += `<span class="space"><span>`;
    } else {
      wordContainer.innerHTML += `<span><span>`;
    }
  });
}
// call the function
setRandWord();

// on click
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("letter")) {
    // call check function
    checker(e);
  }
});

// function to check answers
function checker(e) {
  // get spans which its made to contain word's letters
  wordContainerSpans = document.querySelectorAll(".wordshow > span");
  // set finished falue to loop after some steps
  finished = true;
  // add clicked class to the clicked letter
  e.target.classList.add("clicked");
  // if word contains the clicked  letter
  if (randomWordArr.includes(e.target.textContent)) {
    // play success sound
    document.getElementById("success").play();
    // loop on random word letters
    randomWordArr.forEach((letter, index) => {
      // if clicked leter equals letter from word
      if (e.target.textContent === letter) {
        // add the letter to the screen
        wordContainerSpans[index].textContent = randomWordArr[index];
        // add success class to it
        wordContainerSpans[index].classList.add("success");
      }
    });
    // if word not contains the clicked  letter
  } else {
    // play failed sound
    document.getElementById("fail").play();
    // increase wrongs count
    wrongs++;
    // add wrong class to the draw
    draw.classList.add(`wrong-${wrongs}`);
    if (wrongs === 10) {
      // run failed function
      failed();
    }
  }
  // loop on spans if all of them is successed
  wordContainerSpans.forEach((span) => {
    // if span not contains success class
    if (!span.classList.contains("success")) {
      // false th finished
      finished = false;
    }
  });
  // if finished still true
  if (finished === true) {
    // run win function
    win();
  }
}

// function when the user wins
function win() {
  // add the message on two languages
  if (document.body.id === "arabic") {
    document.querySelector(".message h3").innerHTML = "لقد ربحت";
  } else if (document.body.id === "english") {
    document.querySelector(".message h3").innerHTML = "You Won";
  }
  // show message and hide main
  document.querySelector("main").style.display = "none";
  document.querySelector(".message").style.display = "block";
  // play win sound
  document.querySelector("#win").play();
}

// function when the user fails
function failed() {
  // add the message on two languages
  if (document.body.id === "arabic") {
    document.querySelector(".message h3").innerHTML = "حاول مرة أخرى";
  } else if (document.body.id === "english") {
    document.querySelector(".message h3").innerHTML = "Game Over";
  }
  // show message and hide main
  document.querySelector("main").style.display = "none";
  document.querySelector(".message").style.display = "block";
  // loop on word's letters to show all letters
  randomWordArr.forEach((letter, index) => {
    wordContainerSpans[index].textContent = randomWordArr[index];
  });
}

// on click on play again btn
document.querySelector(".message span").onclick = () => {
  // reset wrongs
  wrongs = 0;
  // reset draw class list
  draw.classList = "draw row";
  // hide message
  document.querySelector(".message").style.display = "none";
  // show main
  document.querySelector("main").style.display = "flex";
  // reset word show spans
  wordContainerSpans = "";
  // reset word show cotent
  wordContainer.innerHTML = "";
  // get letter container
  lettersContainerSpans = document.querySelectorAll(".letters .content span");
  // reset all letters show
  lettersContainerSpans.forEach((span) => {
    span.classList = "letter";
  });
  // se random word
  setRandWord();
};

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
//
