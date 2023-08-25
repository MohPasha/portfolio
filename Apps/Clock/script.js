// let hours = document.querySelector(".clock .hours"),
//   minutes = document.querySelector(".clock .minutes"),
//   seconds = document.querySelector(".clock .seconds");

// let s = 0,
//   m = 0,
//   h = 0;
// setInterval(() => {
//   secondCounter();
//   minutesCounter();
//   hoursCounter();
//   s++;
// }, 1000);

// function secondCounter() {
//   if (s < 10) {
//     seconds.innerHTML = `0${s}`;
//   } else if (s == 59) {
//     s = 0;
//     m++;
//   } else {
//     seconds.innerHTML = s;
//   }
// }

// function minutesCounter() {
//   if (m < 10) {
//     minutes.innerHTML = `0${m}`;
//   } else if (m == 59) {
//     m = 0;
//     h++;
//   } else {
//     minutes.innerHTML = m;
//   }
// }

// function hoursCounter() {
//   if (h < 10) {
//     hours.innerHTML = `0${h}`;
//   } else if (h == 59) {
//     h = 0;
//     h++;
//   } else {
//     hours.innerHTML = h;
//   }
// }
let x = new Date();
console.log(`${x.getDate()}${x.getMonth()}${x.getFullYear()}`);
// let a = localStorage.getItem("pomoTerm-short"),
//   b = localStorage.getItem("pomoTerm-medium"),
//   c = localStorage.getItem("pomoTerm-long"),
//   e = localStorage.getItem(`pomoTerm-breaks`);
// document.querySelector(`.pomoLogs .shortCount .count`).innerHTML = `${
//   a < 10 ? "0" + a : a
// }`;
// document.querySelector(`.pomoLogs .mediumCount .count`).innerHTML = `${
//   b < 10 ? "0" + b : b
// }`;
// document.querySelector(`.pomoLogs .longCount .count`).innerHTML = `${
//   c < 10 ? "0" + c : c
// }`;
// document.querySelector(`.pomoLogs .breaksCount .count`).innerHTML = `${
//   e < 10 ? "0" + e : e
// }`;
