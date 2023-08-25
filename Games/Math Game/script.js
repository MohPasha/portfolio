// get items
let question = document.querySelector(".mathGame main .question"),
  checkBtn = document.querySelector(".mathGame main .inputSec .check"),
  input = document.querySelector(".mathGame main .inputSec .input"),
  scores = document.querySelector(".mathGame header .scores span"),
  levelUp = document.querySelector(".mathGame header .levelUp"),
  timer = document.querySelector(".mathGame header .timer"),
  welcomeMsg = document.querySelector(".welcomeMsg"),
  playBtn = document.querySelector(".welcomeMsg .play"),
  usernameInput = document.querySelector(".welcomeMsg .username"),
  alarm = document.querySelector(".alarm"),
  playAgain = document.querySelector(".alarm .timeFinished .playAgain"),
  username;

document.querySelector(".mathGame .scoresBoard").innerHTML += "";

// show scores
function showHighScore() {
  let values = [];
  if (localStorage.length !== 0) {
    // push values to values list
    for (let [key, value] of Object.entries(localStorage)) {
      if (key.startsWith(`mathGamePlayer:`)) {
        values.push(value);
      }
    }
    if (values.length > 0) {
      // reduce the values list and get greatest value
      let valuesReduce = values.reduce((acc, current) => {
        return acc > current ? acc : current;
      });
      // add the greatest values and its key to scores board
      for (let [key, value] of Object.entries(localStorage)) {
        if (value == valuesReduce) {
          document.querySelector(".mathGame .scoresBoard").innerHTML = `
            <div class="user">
                        <span class="name">${key.slice(15)}</span>
                        <span class="score">${value}</span>
            </div>
            `;
        }
      }
    }
  } else if (localStorage.length == 0) {
    document.querySelector(".mathGame .scoresBoard").innerHTML = `
          <div class="user">
                      <span class="name>Pasha</span>
                      <span class="score">50</span>
          </div>
          `;
  }
}
showHighScore();

// remove welcome message
playBtn.onclick = () => {
  if (usernameInput.value === "" || usernameInput.value === " ") {
    empty(usernameInput, "Invalid Input");
  } else {
    // hide welcome message
    welcomeMsg.style.display = "none";
    // show timer
    timer.style.opacity = 1;
    timer.style.transition = "opacity 1.5s";
    // focus on input
    input.focus();
    // start the timer
    runTheTimer();
    // save username value on vriable
    username = usernameInput.value;
  }
};

// reset the style of username input field
usernameInput.oninput = () => {
  resetInput(usernameInput, "Player Name");
};

// play again
playAgain.onclick = () => {
  // reset seconds
  seconds = 59;
  // reset score
  scoreValue = 0;
  // hide Timeoff message
  alarm.style.display = "none";
  // run the timer again
  runTheTimer();
  // show high score
  showHighScore();
};

// nums to generate value on them
let a, b, c, d;

// score
let scoreValue = 0;

// seconds to use on tiimer
let seconds = 59;
// play game function
function runTheTimer() {
  // start time counter
  let timeCounter = setInterval(() => {
    // add seconds to span
    timer.innerHTML = seconds;
    // if seconds = 0
    if (seconds === 0) {
      // add the scores tolocal storage
      addToLocal();
      // stop the timer
      clearInterval(timeCounter);
      // show the timeoff message
      document.querySelector(".alarm").style.display = "block";
      // blur the input
      input.blur();
    }
    // dicrease seconds
    seconds--;
  }, 1000);
  startTheGame();
}

// reset unput field style
input.oninput = () => {
  resetInput(input, "Your Answer");
};

/* function to generate random nums
  and check input value 
  and start main function */
function startTheGame() {
  //generate random numbers
  generateNums();
  // add it to question
  question.innerHTML = `${a} + ${b}`;
  // add scores to the span
  scores.innerHTML = scoreValue;

  // check value in input and run main func
  checkBtn.onclick = function () {
    // if input is empty
    if (input.value === "") {
      // run function  to alert user
      empty(input, "Invalid Input");
      // if input is not empty
    } else {
      // run main function
      main();
    }
  };

  input.addEventListener("keypress", function (e) {
    if (e.code === "Enter") {
      // if input is empty
      if (input.value === "") {
        // run function  to alert user
        empty(input, "Invalid Input");
        // if input is not empty
      } else {
        // run main function
        main();
      }
    }
  });
}

// main function
function main() {
  // if score less  than 20
  if (scoreValue < 20) {
    // run easy function
    easy();

    // if score equal 20
  } else if (scoreValue == 20) {
    // if answeer is true
    if (parseInt(input.value) === a + b) {
      levelOne();
    }
  } else if (scoreValue > 20 && scoreValue < 40) {
    // run medium function
    medium();
  } else if (scoreValue == 40) {
    // if answeer is true
    if (parseInt(input.value) === a + b + c) {
      levelTwo();
    }
  } else if (scoreValue > 40 && scoreValue < 50) {
    // run hard function
    hard();
  } else if (scoreValue == 50) {
    // win the game
    win();
  } else {
    console.log("Something Wrong");
  }
  // add real score to scores span
  scores.innerHTML = scoreValue;
  // reset the input value
  input.value = "";
  // focus on input field
  input.focus();
}

// level 1
function easy() {
  // if answer is true
  if (parseInt(input.value) === a + b) {
    // increase the score
    scoreValue++;
    seconds += 1;
    // regenerate random nums
    generateNums();
    // add the question
    question.innerHTML = `${a} + ${b}`;
    // if answer is not true
  } else {
    empty(input, "wrong");
  }
}

// level 2
function medium() {
  // if answer is true
  if (parseInt(input.value) === a + b + c) {
    // increase the score
    scoreValue++;
    seconds += 1;
    // regenerate random nums
    generateNums();
    // add the question
    question.innerHTML = `${a} + ${b} + ${c}`;
    // if answer is not true
  } else {
    empty(input, "wrong");
  }
}

// level 3
function hard() {
  // if answer is true
  if (parseInt(input.value) === a + b + c * d) {
    // increase the score
    scoreValue++;
    seconds += 1;
    // regenerate random nums
    generateNums();
    // add the question
    question.innerHTML = `${a} + ${b} + ${c} * ${d}`;
    // if answer is not true
  } else {
    empty(input, "wrong");
  }
}

// level up msg
function levelUpMsg() {
  // increase the score
  scoreValue++;
  // add real score to scores span
  scores.innerHTML = scoreValue;
  // show level up message
  levelUp.style.opacity = 1;
  levelUp.style.transition = "opacity 1.5s";
  // hide level up message after 1.5s
  setTimeout(() => {
    levelUp.style.opacity = "0";
  }, 1500);
}

// level one (20 points) function
function levelOne() {
  // increase level
  levelUpMsg();
  // regenerate random nums
  generateNums();
  // veiw the quistion from new level
  question.innerHTML = `${a} + ${b} + ${c}`;
}

// level one (40 points) function
function levelTwo() {
  // increase level
  levelUpMsg();
  // regenerate random nums
  generateNums();
  // veiw the quistion from new level
  question.innerHTML = `${a} + ${b} + ${c} * ${d}`;
}

// win (50 points) function
function win() {
  // print message to question field
  question.innerHTML = "You Win!";
  // disable input
  input.setAttribute("disabled", "");
  // print message to input field
  input.placeholder = "Congratulations!";
  // change color of input field's bordre
  input.style.border = "1px solid #fc5185";
  // add (win) class to check button
  checkBtn.classList.add("win");
  // print message to check button
  checkBtn.innerHTML = "Winner";
  // clear the countdown
  clearInterval(timeCounter);
  // disable click on check button
  checkBtn.onclick = () => {};
}

// function to use in invalid input
function empty(name, placeholder) {
  // add alert  message to input field
  name.placeholder = placeholder;
  // add an alert border to input field
  name.style.border = "1px solid #fc5185";
  // focus on input field
  name.focus();
}

//function to reset input field's dstyle
function resetInput(name, placeholder) {
  // add a  message to input field
  name.placeholder = placeholder;
  // reset border style
  name.style.border = "1px solid #3fc1c9";
}

// function  to generate random numbers
function generateNums() {
  a = Math.floor(Math.random() * 10);
  b = Math.floor(Math.random() * 10);
  c = Math.floor(Math.random() * 10);
  d = Math.floor(Math.random() * 10);
}

function tamam() {
  console.log("tamam");
}

// add score to local storage
function addToLocal() {
  // add to local storage
  localStorage.setItem(`mathGamePlayer:${username}`, scoreValue);
}

// add animation on seconds = 10
let big = setInterval(() => {
  if (seconds == 10) {
    timer.classList.add("big");
  }
  if (seconds == -1) {
    timer.classList.remove("big");
  }
}, 1000);
