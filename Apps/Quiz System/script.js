// Header Elements
let qCountShow = document.querySelector("header .qCount span");
// quetions & answers elements
let main = document.querySelector("main");
let questionShow = document.querySelector(".question");
let answersContainer = document.querySelector(".answers");
let submitBtn = document.querySelector(".submit");
// bulets
let bullets = document.querySelector(".bullets");
let bulletsSpans = document.querySelector(".bullets .spans");
let bulletsTimer = document.querySelector(".bullets .timer");
// results
let resultsShow = document.querySelector(".results");

// App Elements
let currentQuest = 0;
let qCount;
let timer;
let stableDuration = 30;
let duration = stableDuration;
let score = 0;

// Fetch Elements
let data;
let url = "data.json";
let request = new XMLHttpRequest();
request.open("GET", url, true);
request.send();
request.onreadystatechange = () => {
  if (request.status === 200 && request.readyState === 4) {
    data = JSON.parse(request.response);
    // get questions Count
    qCount = data.length;
    // Add Bullets Spans
    for (let i = 0; i < data.length; i++) {
      let span = document.createElement("span");
      bulletsSpans.appendChild(span);
    }
    // Show The Questions Count
    qCountShow.textContent = qCount - currentQuest;
    // Shuffle Questions
    shuffle(data);
    // Show Quests And Answers
    showQuests();
    // When Click On Submit Btn
    submitBtn.onclick = function () {
      // Clear The Timer
      clearInterval(timer);
      // Reset duration
      duration = stableDuration;
      // Check The Answer Function
      checkAnswer();
      currentQuest++;
      if (currentQuest == qCount) {
        console.log("DONE");
        main.remove();
        bullets.remove();
        showResult();
      } else if (currentQuest < qCount) {
        showQuests();
      }
    };
  }
};

// Function To Shuffle Cards
function shuffle(array) {
  let current = array.length;
  let temp;
  let random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
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

// Function To Show Questions
function showQuests() {
  questionShow.innerHTML = "";
  answersContainer.innerHTML = "";
  // Add Active Class To Bullet
  bulletsSpans.childNodes[currentQuest].className = "active";
  // Show The Question
  questionShow.textContent = data[currentQuest].question;
  // Get Answers From Data
  let answers = data[currentQuest].answers;
  // Shuffle Answer
  shuffle(answers);
  // Show Answers
  answersContainer.innerHTML = "";
  for (const answer of answers) {
    let index = answers.indexOf(answer);
    if (answers.indexOf(answer) == 0) {
      let div = document.createElement("div");
      div.className = "answer";
      div.innerHTML = `<input data-answer="${answer}" type="radio" name="answer" id="answer_${index}" checked><label for="answer_${index}">${answer}</label>`;
      answersContainer.appendChild(div);
    } else {
      let div = document.createElement("div");
      div.className = "answer";
      div.innerHTML = `<input data-answer="${answer}" type="radio" name="answer" id="answer_${index}"><label for="answer_${index}">${answer}</label>`;
      answersContainer.appendChild(div);
    }
  }
  // decrease Questions Count On Screen
  qCountShow.textContent = qCount - currentQuest - 1;

  // currentQuest++;
  // Set Timer
  timer = setInterval(() => {
    // Set  Mins And Secs
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    // Add Secs And Mins  To The Scren
    bulletsTimer.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    // Decrease Duration
    duration--;
    // If Duration Ended
    if (duration == -1) {
      // Clear Timer
      clearInterval(timer);
      // Click On Submit
      submitBtn.click();
    }
  }, 1000);
}

// Function To Check Answers
function checkAnswer() {
  // Get User Answer
  let userAnswer = document.querySelector(".answers .answer input:checked");
  //   showQuests();
  if (userAnswer.dataset.answer === data[currentQuest].rightAnswer) {
    score++;
  }
  // Reset Fields
  questionShow.innerHTML = "";
  answersContainer.innerHTML = "";
}

// Funciton To Show Scores
function showResult() {
  // Show Results Div
  resultsShow.classList.remove("none");
  // Get Class From  User Score
  let resultClass =
    score >= 0 && score < qCount / 2
      ? "bad"
      : score > qCount / 2 && score < qCount
      ? "good"
      : score == qCount
      ? "perfect"
      : false;

  // Set Ranks
  let rank =
    resultClass == "bad"
      ? "ضعيف"
      : resultClass == "good"
      ? "ممتاز"
      : resultClass == "perfect"
      ? "رائع"
      : false;

  // Add Class To results
  resultsShow.classList.add(resultClass);
  // Add Content To Results Div
  resultsShow.innerHTML = `
  <h3>${rank}</h3>
  <p>درجتك <span>${score}</span> من ${qCount}</p>
  `;
}
