// Elements On Message
let messages = document.querySelector(".messages");
let h3 = document.querySelector(".messages .content h3");
let levels = document.querySelector(".messages .content .levels");
let lvlEasy = document.querySelector("#easy");
let lvlMedium = document.querySelector("#medium");
let lvlHard = document.querySelector("#hard");
let input = document.querySelector(".messages .content > input");
let startBtn = document.querySelector(".messages .content span");
// Header Elemente
let timeShow = document.querySelector("header .time");
let wrongsLemet;
let triesShow = document.querySelector("header .tries span");
let timer;
let curLevel = document.querySelector("header .curLevel");
// Game Elements
let game = document.querySelector(".game");
let duration = 500;
let cards = document.querySelectorAll(".game .card div");
let cardsList = [
  "whatsapp",
  "whatsapp",
  "facebook",
  "facebook",
  "telegram",
  "telegram",
  "google",
  "google",
  "youtube",
  "youtube",
  "linkedin",
  "linkedin",
  "apple",
  "apple",
  "windows",
  "windows",
];
// Audio
let successAud = document.querySelector(".success");
let failedAud = document.querySelector(".failed");
let winAud = document.querySelector(".win");

// --------------------------------------------

// On Click On Start Btn
startBtn.onclick = () => {
  // Reset Tries
  triesShow.innerHTML = 0;
  // Set Levels Seconds And Tries And Show It
  if (lvlEasy.checked) {
    timeShow.innerHTML = 90;
    wrongsLemet = 15;
    curLevel.innerHTML = "Easy, 90 Sec 15 Tries";
  } else if (lvlMedium.checked) {
    timeShow.innerHTML = 60;
    wrongsLemet = 10;
    curLevel.innerHTML = "Medium, 60 Sec 10 Tries";
  } else if (lvlHard.checked) {
    timeShow.innerHTML = 30;
    wrongsLemet = 5;
    curLevel.innerHTML = "Hard, 30 Sec 5 Tries";
  }
  // Empty Game Container From Any Thing From Last Game
  game.innerHTML = "";
  // Hide Messages
  messages.classList.add("none");
  // Set User Name And Default Name
  if (input.value == "") {
    document.querySelector("header .name span").innerHTML = "user";
  } else {
    document.querySelector("header .name span").innerHTML = input.value;
  }
  // Run App Functions
  shuffle(cardsList);
  addCards();
  checker();
  // Interval To Decrease The Time And End The Game
  timer = setInterval(() => {
    // Decrease The Time
    timeShow.innerHTML--;
    // If Time = 0 Or Available Tries = 0 End The Game With Lose
    if (
      parseInt(timeShow.innerHTML) == 0 ||
      parseInt(triesShow.innerHTML) == wrongsLemet
    ) {
      // Remove Timer Interval
      clearInterval(timer);
      // Show Message
      messages.classList.remove("none");
      // Edit Message Content
      h3.innerHTML = `Hard Luck!`;
      h3.className = "lose";
      // input.classList.add("none");
      startBtn.innerHTML = "Play Again";
      // levels.classList.add("none");
    }
  }, 1000);
};

// --------------------------------------------

// Function To Shuffle Cards
function shuffle(array) {
  let current = array.length;
  let temp;
  let random;
  while (current > 0) {
    random = Math.round(Math.random() * current);
    current--;
    // [1] -> Save Last Element On Stash
    temp = array[current];
    // [2] -> Set Last Element = The Random Element
    array[current] = array[random];
    // [3] -> Set The Random Element = The Element From Stash
    array[random] = temp;
  }
  return array;
}

// --------------------------------------------

// Function To Add Cards To The Game
function addCards() {
  // Loop On Card List
  cardsList.forEach((card) => {
    // Add The Card
    game.innerHTML += `<div class="flipped card" data-icon="${card}" style="height:100%">
    <div class="front">!</div>
    <div class="back fab fa-brand fa-${card}"></div>
  </div>`;
  });
}

// --------------------------------------------

// Function To Check  Answers
function checker() {
  // Get Cards
  cards = document.querySelectorAll(".game .card div");
  // Loop On Cards
  cards.forEach((card) => {
    // On Click On Any Card
    card.onclick = () => {
      // Flip Card
      card.parentElement.classList.add("flipped");
      // Get Data Attribute
      let cardOneData = card.parentElement.getAttribute("data-icon");
      // Loop On Cards Again
      cards.forEach((cardTwo) => {
        // On Click On Another Card
        cardTwo.onclick = () => {
          // Flip The Card
          cardTwo.parentElement.classList.add("flipped");
          // Get Data Attribute
          let cardTwoData = cardTwo.parentElement.getAttribute("data-icon");
          // If Data On Two Cards Same
          if (cardOneData === cardTwoData) {
            successAud.play();
            // Add Success Class To The Cards
            card.parentElement.classList.add("success");
            cardTwo.parentElement.classList.add("success");
            // Run Function To Check If User Is Won
            finishGame();
          } else {
            failedAud.play();
            triesShow.innerHTML++;
          }
          // Run Check Function Again
          checker();
        };
      });
    };
    // Remove Flip Class From All Cards
    setTimeout(() => {
      card.parentElement.classList.remove("flipped");
    }, duration);
  });
}

// --------------------------------------------

// Function When User Win
function finishGame() {
  // Variable To Check
  let finished = true;
  // Loop On Cards
  cards.forEach((card) => {
    // If Any Card Not Contains Success Class = Not Finished
    if (!card.parentElement.classList.contains("success")) {
      finished = false;
    }
  });
  // If All Cards Contains Success Class = Finished
  if (finished === true) {
    winAud.play();
    // Show Play Again Message
    messages.classList.remove("none");
    // Set Message Elements
    h3.innerHTML = `You Win!`;
    h3.className = "win";
    // input.className = "none";
    startBtn.innerHTML = "Play Again";
    // levels.classList.add("none");
    // Clear Timer
    clearInterval(timer);
  }
}

// --------------------------------------------

// Control On Profile Menu
let logo = document.querySelector(".messages img");
let profile = document.querySelector(".profile");
let closeBtn = document.querySelector(".profile .close");
let openBtn = document.querySelector(".messages .open");

logo.addEventListener("click", () => {
  profile.classList.add("show");
});
openBtn.onclick = () => {
  profile.classList.toggle("show");
};
closeBtn.onclick = () => {
  profile.classList.remove("show");
};
//
