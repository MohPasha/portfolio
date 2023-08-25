let sentences = [
  'The word culture is derived from the Latin root cultura or cultus meaning to "inhabit, cultivate, or honour". In general, culture refers to human activity; different definitions of culture reflect different theories for understanding, or criteria for valuing human activity. Present-day anthropologists use the term to refer to the universal human capacity to classify experiences and to encode and communicate them symbolically. They regard this capacity as a defining feature of the genus Homo. Since culture is learned, people living in different places have different cultures. There can be different cultures in different countries, and there can also be shared cultures among continents.',
  'Geography (Greek Geo (γη) or Gaea (γαία), meaning "Earth", and graphein (γράφειν) meaning "to describe" or "to write") is the study of the earth and its features, inhabitants, and phenomena. A literal translation would be "to describe or write about the Earth". The first person to use the word "geography" was Eratosthenes (275-195 B.C.). Four historical traditions in geographical research are the spatial analysis of natural and human phenomena (geography as a study of distribution), area studies (places and regions), study of man-land relationship, and research in earth sciences. Nonetheless, modern geography is an all-encompassing discipline that foremost seeks to understand the world and all of its human and natural complexities — not merely where objects are, but how they have changed and come to be. As "the bridge between the human and physical sciences," geography is divided into two main branches — human geography and physical geography.',
  'In science, the term natural science refers to a rational approach to the study of the universe, which is understood as obeying rules or laws of natural origin. The term "natural science" is also used to distinguish those fields that use the scientific method to study nature from the social sciences, which use the scientific method to study human behavior and society; and from the formal sciences, such as mathematics and logic, which use a different methodology. Physical science is an encompassing term for the branches of natural science, and science, that study non-living systems, in contrast to the biological sciences. However, the term "physical" creates an involuntary, somewhat arbitrary distinction, since many branches of physical science also study biological phenomena.',
  "Philosophy has almost as many definitions as there have been philosophers, both as a subject matter and an activity, and no simple definition can do it justice. The issue of the definition of philosophy is thus a controversial subject that is nowadays tackled by Metaphilosophy (or the philosophy of philosophy). The word is derived from the ancient Greek words philo-, to love or to befriend, and -sophia, wisdom. Modern usage of the term is much broader; the concept of philosophy encompasses all of knowledge and all that can be known, including the means by which such knowledge can be acquired. However, in the contemporary English-speaking academic world, the term is often used implicitly to refer to analytic philosophy and, in non-English speaking countries, it often refers implicitly to a different, European strain, continental philosophy. The ancient Greeks organized the subject into five basic categories: metaphysics, epistemology, ethics, politics and aesthetics. This organization of the subject is still largely in use in Western philosophy today.",
  'A society is a group of people who form a semi-closed system. At its simplest, the term society refers to a large group of people sharing their own culture and institutions. A society is a network of relationships between people. The English word society is derived from the French société, which had its origin in the Latin societas, a "friendly association with others," from socius meaning "companion, associate, comrade or business partner." Thus, the meaning of society is closely related to what is considered to be social. Implicit in the meaning of society is that its members may share some mutual concern or interest, a common objective or common characteristics. The social sciences generally use the term society to mean a group of people who form a semi-closed social system, in which most interactions are with other individuals belonging to the group. More abstractly, a society is defined as a network of relationships between social entities. A society is also sometimes defined as an interdependent community, but the sociologist Tönnies sought to draw a contrast between society and community. An important feature of society is social structure, aspects of which include roles and social ranking.',
  "A reference work is a compendium of information, usually of a specific type, compiled in a book for ease of reference. That is, the information is intended to be quickly found when needed. Reference works are usually referred to for particular pieces of information, rather than read cover to cover. The writing style used in these works is informative; the authors avoid use of the first person, and emphasize facts. Indexes are commonly provided in many types of reference work. Updated editions are published as needed, in some cases annually. In comparison, a reference book or reference-only book in a library is one that may only be used in the library and not borrowed from the library. Many such books are reference works (in the first sense) which are usually used only briefly or photocopied from, and therefore do not need to be borrowed. Keeping them in the library assures that they will always be available for use on demand. Other reference-only books are ones that are too valuable to permit borrowers to take them out. Reference-only items may be shelved in a reference collection located separately from circulating items or individual reference-only items may be shelved among items available for borrowing.",
];
// html elements
let wordsCount = document.querySelector(".wordsCount span");
let seconds = document.querySelector(".time span");
let wordShow = document.querySelector(".word");
let input = document.querySelector("#input");

window.onload = function () {
  input.focus();
  input.value = "";
};
input.onpaste = function () {
  return false;
};

let lastScore = document.querySelector("main .score");
let lastScoreSpan = document.querySelector("main .score h3 span");
let playAgainBtn = document.querySelector("main .score .click");

mainFunction();

playAgainBtn.onclick = () => {
  playAgain();
};

function mainFunction() {
  let sentence = sentences[Math.floor(Math.random() * sentences.length)];
  let words = sentence.split(" ");
  let wordsLength = words.length;
  let currentWordLength;
  let clicked = false;
  let timer;
  words.forEach((word) => {
    wordShow.innerHTML += `<span>${word} </span>`;
    currentWordLength = word.length;
  });
  input.onkeyup = () => {
    if (clicked === false) {
      timer = setInterval(() => {
        seconds.innerHTML--;
      }, 1000);
      clicked = true;
    } else {
      clicked = true;
    }
    let firstSpan = document.querySelector(".word span:first-child");
    if (input.value === firstSpan.textContent) {
      wordsCount.innerHTML++;
      input.value = "";
      words = words.slice(1);
      wordShow.innerHTML = "";
      words.forEach((word) => {
        if (words.length == 1) {
          wordShow.innerHTML += `<span>${word}</span>`;
        } else {
          wordShow.innerHTML += `<span>${word} </span>`;
        }
        currentWordLength = word.length;
      });
    }

    if (wordShow.childElementCount == 0 || seconds.innerHTML == 0) {
      wordShow.innerHTML = `<h3>Time Finished</h3>`;
      input.setAttribute("disabled", "true");
      input.setAttribute("placeholder", "Time Finished");
      clearInterval(timer);
      lastScoreSpan.innerHTML = `${wordsCount.innerHTML} Words/Minute`;
      lastScore.classList.remove("none");
    }
  };
}

function playAgain() {
  seconds.innerHTML = "60";
  wordsCount.innerHTML = "0";
  lastScore.classList.add("none");
  wordShow.innerHTML = ``;
  input.removeAttribute("disabled");
  input.setAttribute("placeholder", "Type here");
  input.focus();
  mainFunction();
}
