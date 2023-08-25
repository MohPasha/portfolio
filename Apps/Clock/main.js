// بسم الله الرحمن الرحيم
// والصلاة والسلام على نبينا محمد صلى الله عليه وسلم
/*
###############################################################################################################
###############################################################################################################
###############################################################################################################
*/
// ON LOAD WINDOW ------------------------------------------------------------------------------------------------
window.onload = () => {
  // set date
  let newDate = new Date();
  // --------------------------------------------------------
  //  if there is a body theme on local storage
  if (localStorage.getItem("bodyTheme")) {
    // add it to body
    document.body.className = localStorage.getItem("bodyTheme");
    //  if there is a body theme on local storage
  } else if (!localStorage.getItem("bodyTheme")) {
    // set default theme on local
    localStorage.setItem("bodyTheme", "theme1");
    // add it to body
    document.body.className = "theme1";
  }
  // --------------------------------------------------------
  // run clock
  clock(true, true, true);
  // --------------------------------------------------------
  // list to storage keys from local storage
  let fullkeys = [];
  let slicedKeys = [];
  // loop on local storage to add elements > if add been after load time logger will not works
  for (let [key, value] of Object.entries(localStorage)) {
    // push key
    fullkeys.push(key);
    slicedKeys.push(key.slice(0, 7));
  }
  // --------------------------------------------------------
  // if local storage has no timlgr elements
  if (!slicedKeys.includes("timlgr-")) {
    // set default elements
    localStorage.setItem(`timlgr-Programming`, "00:00:00");
    localStorage.setItem(`timlgr-Reading`, "00:00:00");
  }
  // --------------------------------------------------------
  // if local storage has no pomodoro elements
  if (!fullkeys.includes("pomoTerm-short")) {
    localStorage.setItem("pomoTerm-short", 0);
    localStorage.setItem("pomoTerm-medium", 0);
    localStorage.setItem("pomoTerm-long", 0);
    localStorage.setItem(`pomoTerm-breaks`, 0);
  }
  //  if there is no date on locale
  if (!fullkeys.includes("real-Date")) {
    // set new date
    localStorage.setItem(
      `real-Date`,
      `${newDate.getDate()}${newDate.getMonth()}${newDate.getFullYear()}`
    );
    //  if there is date on locale
  } else if (fullkeys.includes("real-Date")) {
    // if date now not equal date  on local storage
    if (
      localStorage.getItem("real-Date") !==
      `${newDate.getDate()}${newDate.getMonth()}${newDate.getFullYear()}`
    ) {
      // reset time logger elements
      for (let key of fullkeys) {
        if (key.startsWith("timlgr-")) {
          localStorage.setItem(key, "00:00:00");
          // reset pomodoro elements
        }
        if (key.startsWith("pomoTerm-")) {
          localStorage.setItem(key, 0);
        }
      }
      // set new date on locale
      localStorage.setItem(
        `real-Date`,
        `${newDate.getDate()}${newDate.getMonth()}${newDate.getFullYear()}`
      );
      // if date now equal date  on local storage
    } else {
      return 0;
    }
  }
};
let tasksList = document.querySelector(".timeLoggerContainer .list .tasks");
// loop on local storage to add elements > if add been after load time logger will not works
for (let [key, value] of Object.entries(localStorage)) {
  // / get timelgr elements
  if (key.slice(0, 7) === "timlgr-") {
    // add it to screen
    let div = document.createElement("div");
    div.innerHTML = `<div class="task"><span class="taskName">${key.slice(
      7
    )}</span><span>${value}</span></div>`;
    tasksList.appendChild(div);
  }
}
/*
###############################################################################################################
###############################################################################################################
###############################################################################################################
*/
// SWITCHER: --------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------
// switcher elements
let timeLoggerBtn = document.querySelector(".switch .timeLogger"),
  pomodoroBtn = document.querySelector(".switch .pomodoro"),
  timeLoggerContainer = document.querySelector(".timeLoggerContainer "),
  pomodoroContainer = document.querySelector(".pomodoroContainer ");
//--------------------------------------------------------------------

// global elements
let hours = document.querySelector(".clock .hours"),
  minutes = document.querySelector(".clock .minutes"),
  seconds = document.querySelector(".clock .seconds");

// global controls
let startBtn = document.querySelector(".control .start"),
  pauseBtn = document.querySelector(".control .pause"),
  resetBtn = document.querySelector(".control .reset");

/*
###############################################################################################################
###############################################################################################################
###############################################################################################################
*/
// CLOCK: -----------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------
// set clock

startBtn.onclick = () => clock(true, false, false);
pauseBtn.onclick = () => clock(false, true, false);
resetBtn.onclick = () => clock(false, false, true);
//--------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// function to  set clock
function clock(starter = false, pauser = false, resetor = false) {
  starter == true // if starter param is true > set interval
    ? (clockInterval = setInterval(() => clockMain(), 1000))
    : pauser == true // if pauser param is true > stop interval
    ? clearInterval(clockInterval)
    : resetor == true // if resetor param is true > run reset func
    ? reset()
    : true; // else
}
// main func on clock
function clockMain() {
  // get date
  let dateNow = new Date();
  // Add hours
  dateNow.getHours() < 10
    ? (hours.innerHTML = `0${dateNow.getHours()}`)
    : (hours.innerHTML = dateNow.getHours()); // add it immediatly
  // Add minutes
  dateNow.getMinutes() < 10
    ? (minutes.innerHTML = `0${dateNow.getMinutes()}`)
    : (minutes.innerHTML = dateNow.getMinutes()); // add it immediatly
  // Add seconds
  dateNow.getSeconds() < 10
    ? (seconds.innerHTML = `0${dateNow.getSeconds()}`)
    : (seconds.innerHTML = dateNow.getSeconds()); // add it immediatly
}
// reset func
function reset() {
  // stop interval
  clearInterval(clockInterval);
  // reset values on screen
  hours.innerHTML = "00";
  minutes.innerHTML = "00";
  seconds.innerHTML = "00";
}
// -------------------------------------------------------------------------------------------------------------------------

/*
###############################################################################################################
###############################################################################################################
###############################################################################################################
*/
// TIME LOGGER ------------------------------------------------------------------------------------------------

// variable of interval
let int;
// tasks control elements
let addTaskBtn = document.querySelector(".timeLoggerContainer .adder .addTask"),
  delTaskBtn = document.querySelector(".clockContainer .delTask"),
  taskNameInput = document.querySelector("#inputTask"),
  taskArea = document.querySelector(".clock  header");
//--------------------------------------------------------------------
// on click on time logger btn
timeLoggerBtn.onclick = () => {
  tasksList = document.querySelector(".timeLoggerContainer .list .tasks");
  timeLoggerFunc();
  // Switch to time logger
  timeLoggerBtn.classList.add("active");
  pomodoroBtn.classList.remove("active");
  timeLoggerContainer.style.display = "block";
  pomodoroContainer.style.display = "none";
  // hide delete btn
  delTaskBtn.style.display = "none";
  // show default values on screen
  taskArea.innerHTML = "Time Logger";
  seconds.innerHTML = "00";
  minutes.innerHTML = "00";
  hours.innerHTML = "00";
  // stop interval
  clearInterval(int);
  // pause
  pauseBtn.click();
  // ---------------------------------------------------------------------
  // Add task
  addTaskBtn.onclick = () => {
    // if input is empty
    if (taskNameInput.value === "") {
      // alret user
      taskNameInput.style.outline = "2px solid #f67280";
      taskNameInput.placeholder = "Invalid Input";
      taskNameInput.focus();
      // if input isn't empty
    } else {
      //array to save  tasks names
      let x = [];
      // get tasks name spans
      let tasksNames = document.querySelectorAll(
        ".timeLoggerContainer .list .tasks .task .taskName"
      );
      // loop on tasks names spas to save inner html
      tasksNames.forEach((task) => {
        x.push(task.innerHTML);
      });

      // if input value not excised
      if (!x.includes(taskNameInput.value)) {
        // add new task
        let div = document.createElement("div");
        div.innerHTML = `<div class="task"><span class="taskName">${taskNameInput.value}</span><span>00:00:00</span></div>`;
        tasksList.appendChild(div);
        // run time logger function
        timeLoggerFunc();
        // add it to locale storage
        localStorage.setItem(`timlgr-${taskNameInput.value}`, "00:00:00");
        // reset input value
        taskNameInput.value = "";
        // if input value excised
      } else {
        // alret user
        taskNameInput.value = "";
        taskNameInput.style.outline = "2px solid #f67280";
        taskNameInput.placeholder = "Task Name Already Excised";
        taskNameInput.focus();
      }
    }
  };

  // reset input theme
  taskNameInput.onkeydown = () => (taskNameInput.style.outline = "none");
};
// time logger main function
//--------------------------------------------------------------------
function timeLoggerFunc() {
  // get all tasks fields
  let tasks = document.querySelectorAll(".tasks .task");
  // run an every task
  tasks.forEach((task) => {
    //click on task
    task.onclick = () => {
      // show delete btn
      delTaskBtn.style.display = "block";
      // save the values of task > name and time
      let taskName = task.firstChild.innerHTML;
      taskValue = task.lastChild.textContent;

      // reset clock
      clock(false, false, true);
      // Add task name to task ara
      taskArea.innerHTML = taskName;
      // get seconds minutes and hours from task value
      s = parseInt(taskValue.slice(6, 8));
      m = parseInt(taskValue.slice(3, 5));
      h = parseInt(taskValue.slice(0, 2));
      // show it on screen
      hours.innerHTML = `${h < 10 ? "0" + h : h}`;
      minutes.innerHTML = `${m < 10 ? "0" + m : m}`;
      seconds.innerHTML = `${s < 10 ? "0" + s : s}`;
      //--------------------------------------------------------------------
      let autosave;
      //--------------------------------------------------------------------

      // on click on start btn
      startBtn.onclick = () => {
        // if there is interval
        if (clearInterval(int)) {
          // if there is no interval
        } else {
          // set interval to run count function
          int = setInterval(() => {
            counter();
            // increase seconds by one
            s++;
          }, 1000);
        }
        if (!clearInterval(autosave)) {
          // save the values every seconds if there is a trouble brogram will auto saved
          autosave = setInterval(() => {
            // update value on program
            taskValue = `${`${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
              s < 10 ? "0" + s : s
            }`}`;
            // update value on local storage
            localStorage.setItem(`timlgr-${taskName}`, taskValue);
          }, 1000);
        }
      };
      //--------------------------------------------------------------------

      // on click on pause btn
      pauseBtn.onclick = () => {
        clearInterval(autosave);
        // stop counter
        clearInterval(int);
        // add couter values to taskvale
        task.lastElementChild.innerHTML = `${h < 10 ? "0" + h : h}:${
          m < 10 ? "0" + m : m
        }:${s < 10 ? "0" + s : s}`;
        taskValue = task.lastElementChild.innerHTML;
        // savve t to local storage
        localStorage.setItem(`timlgr-${taskName}`, taskValue);
        // console.log();
      };
      //--------------------------------------------------------------------

      // on click on reset btn
      resetBtn.onclick = () => {
        clearInterval(autosave);
        // stop counter
        clearInterval(int);
        // reset seconds mins hours
        s = 0;
        m = 0;
        h = 0;
        // add couter values to taskarea
        seconds.innerHTML = `0${s}`;
        minutes.innerHTML = `0${m}`;
        hours.innerHTML = `0${h}`;
        // add couter values to taskvalue
        task.lastElementChild.innerHTML = "00:00:00";
        taskValue = task.lastElementChild.innerHTML;
        // resetit on local storage
        localStorage.setItem(`timlgr-${taskName}`, taskValue);
      };
      //--------------------------------------------------------------------

      // on click on delete btn
      delTaskBtn.onclick = () => {
        clearInterval(autosave);

        // remove it from local storage
        localStorage.removeItem(`timlgr-${taskName}`);
        // remove it from screen
        task.parentElement.remove();
        // hide delete btn
        delTaskBtn.style.display = "none";
      };
      //--------------------------------------------------------------------

      // counter finction
      function counter() {
        // format seconds
        s < 10
          ? (seconds.innerHTML = `0${s}`) // seconds < 10 add it with 0 before
          : s == 60
          ? ((seconds.innerHTML = `00`), (s = 0), m++) // seconds = 60, reset seconds, increase minutes
          : (seconds.innerHTML = s);

        // format minutes
        m < 10
          ? (minutes.innerHTML = `0${m}`) // minutes < 10 add it with 0 before
          : m == 60
          ? ((minutes.innerHTML = `00`), (m = 0), h++) // minutes = 60, reset minutes, increase hours
          : (minutes.innerHTML = m);

        // format hours
        h < 10 ? (hours.innerHTML = `0${h}`) : (hours.innerHTML = h);
      }
    };
  });
}

// ---------------------------------------------------------------------------------------------------------

/*
###############################################################################################################
###############################################################################################################
###############################################################################################################
*/
// POMODORO ---------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------
// pomodoro elements
let shortTerm = document.querySelector(".pomodoroContainer .terms .short"),
  medTerms = document.querySelector(".pomodoroContainer .terms .medium"),
  longTerm = document.querySelector(".pomodoroContainer .terms .long");

//--------------------------------------------------------------------
// pomodoro main variables
let sp = 0,
  mp = 0,
  hp = 0;
//--------------------------------------------------------------------
// on click on pomo btn
pomodoroBtn.onclick = () => {
  // switch layout
  pomodoroBtn.classList.add("active");
  timeLoggerBtn.classList.remove("active");
  timeLoggerContainer.style.display = "none";
  pomodoroContainer.style.display = "block";
  delTaskBtn.style.display = "none";
  taskArea.innerHTML = "Pomodoro";
  // add elements to screen
  seconds.innerHTML = `${sp < 10 ? "0" + sp : sp}`;
  minutes.innerHTML = `${mp < 10 ? "0" + mp : mp}`;
  hours.innerHTML = `${hp < 10 ? "0" + hp : hp}`;
  // pause any interval
  pauseBtn.click();
  //--------------------------------------------------------------------
  // short term
  shortTerm.onclick = () => {
    termsControl("Short", 25, 0);
  };
  //--------------------------------------------------------------------
  // medium term
  medTerms.onclick = () => {
    termsControl("Medium", 50, 0);
  };
  //--------------------------------------------------------------------
  // long term
  longTerm.onclick = () => {
    termsControl("Long", 25, 1);
  };
};
//--------------------------------------------------------------------
// function to control terms
function termsControl(term, mins, hour) {
  // reset clock
  clock(false, false, true);
  // clear interval
  clearInterval(int);
  // add term to  screen
  taskArea.innerHTML = `${term} Term`;
  minutes.innerHTML = mins;
  hours.innerHTML = `0${hour}`;
  // set term vars
  sp = 0;
  mp = mins;
  hp = hour;
  //--------------------------------------------------------------------
  // on press start
  startBtn.onclick = () => {
    // if there is no interval,
    // this condition will help to cancel interval's repeat
    // which is make counter faster
    if (!clearInterval(int)) {
      // set ne interval
      int = setInterval(() => {
        // run  main function with parameter's term
        counterPomodoro(term.toLowerCase);
        // decrease seconds
        sp--;
        // interval time (1s)
      }, 1000);
    }
  };
}
//i can merge this functions but will be hard to read and edit
// counter finction
function counterPomodoro(term = "Default") {
  // varible to control resets
  let resetStatus;
  //--------------------------------------------------------------------
  // on click on pause
  pauseBtn.onclick = () => {
    // clear interval
    clearInterval(int);
  };
  //--------------------------------------------------------------------
  // on click on reset
  resetBtn.onclick = () => {
    // clear interval
    clearInterval(int);
    // add reset status
    resetStatus = true;
    // reset vars
    sp = 0;
    mp = 0;
    hp = 0;
    // reset it on screen
    seconds.innerHTML = `0${sp}`;
    minutes.innerHTML = `0${mp}`;
    hours.innerHTML = `0${hp}`;
    // stop start btn
    startBtn.onclick = () => 1;
  };
  //--------------------------------------------------------------------
  // counter
  //--------------------------------------------------------------------
  // if seconds = -1
  if (sp == -1) {
    // reset it to 59
    sp = 59;
    seconds.innerHTML = sp;
    // decrease minutes by one
    mp -= 1;
    // if seconds less than 10
  } else if (sp < 10) {
    // show it with 0 before
    seconds.innerHTML = `0${sp}`;
  } else {
    // show it without 0 before
    seconds.innerHTML = sp;
  }
  //--------------------------------------------------------------------
  // if minutes = -1
  if (mp == -1) {
    // reset it to 0
    mp = 0;
    minutes.innerHTML = mp;
    // decrease hours by onec
    hp -= 1;
    // if minutes less than 10
  } else if (mp < 10) {
    // show it with 0 before
    minutes.innerHTML = `0${mp}`;
  } else {
    // show it without 0 beforec
    minutes.innerHTML = mp;
  }
  //--------------------------------------------------------------------
  // if hours = -1
  if (hp == -1) {
    // reset it to 0
    hp = 00;
    hours.innerHTML = hp;
    // if hours less than 10
  } else if (hp < 10) {
    // show it with 0 before
    hours.innerHTML = `0${hp}`;
  } else {
    // show it with 0 before
    hours.innerHTML = hours;
  }
  //--------------------------------------------------------------------
  // if minutes hours and second = 0, and resetvalue not excited
  // which is means term is finished
  if (sp == 0 && mp == 00 && hp == 00 && resetStatus == undefined) {
    // clear interval
    clearInterval(int);
    // get  the term value from locale
    z = localStorage.getItem(`pomoTerm-${term}`);
    // increase value by one
    d = parseInt(z) + 1;
    // update term value on locale
    localStorage.setItem(`pomoTerm-${term}`, d);
    // update counter on screen
    document.querySelector(`.pomoLogs .${term}Count .count`).innerHTML = `${
      d < 10 ? "0" + d : d
    }`;
    //--------------------------------------------------------------------
    // term break ended
    if (term === "breaks") {
      // clear interval
      clearInterval(int);
      // reset values
      mp = 0;
      sp = 0;
      hp = 0;
      // alert user that is break was finished
      taskArea.innerHTML = "Break is Finished";
      // stop start btn
      startBtn.onclick = () => 1;
    } else {
      // run break function
      breaks();
    }
  }
  // if minutes hours and second = 0
  // which is means terms ended  or reset pressed
  if (sp == 0 && mp == 00 && hp == 00) {
    // clear interval
    clearInterval(int);
  }
}
//breaks function
function breaks() {
  // add to screen
  taskArea.innerHTML = "Lets Take A Break";
  seconds.innerHTML = "00";
  minutes.innerHTML = "05";
  hours.innerHTML = "00";
  // on press on start
  startBtn.onclick = () => {
    // reset vars
    sp = 0;
    mp = 5;
    hp = 0;
    // set interval
    int = setInterval(() => {
      counterPomodoro("breaks");
      sp--;
    }, 1000);
  };
}
//--------------------------------------------------------------------
/*
###############################################################################################################
###############################################################################################################
###############################################################################################################
*/
// THEMES -----------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------
// get vars
let themes = document.querySelector(".container #themes"),
  themesDiv = document.querySelector("#themes .themesDiv"),
  themesControl = document.querySelector(".container .bars"),
  theme1btn = document.querySelector("#themes .themesDiv .theme1btn"),
  theme2btn = document.querySelector("#themes .themesDiv .theme2btn"),
  theme3btn = document.querySelector("#themes .themesDiv .theme3btn");

//show and hide themes list
themesControl.onclick = () => {
  themes.classList.toggle("view");
  themesControl.classList.toggle("light");
};
// theme 1
theme1btn.onclick = () => {
  localStorage.setItem("bodyTheme", "theme1");
  document.body.className = "theme1";
};
// theme 2
theme2btn.onclick = () => {
  localStorage.setItem("bodyTheme", "theme2");
  document.body.className = "theme2";
};
// theme 3
theme3btn.onclick = () => {
  localStorage.setItem("bodyTheme", "theme3");
  document.body.className = "theme3";
};
// hide themes list on click on any place on screen which is have not (noTouch) class
window.onclick = (e) => {
  if (!e.target.classList.contains("noTouch")) {
    if (themes.classList.contains("block")) {
      themes.classList.toggle("block");
      themes.classList.toggle("none");
      themesControl.classList.toggle("dark");
      themesControl.classList.toggle("light");
    }
  }
};
//--------------------------------------------------------------------
/*
###############################################################################################################
###############################################################################################################
###############################################################################################################
*/
//PSUEDO FUNCTION: --------------------------------------------------------------------------------------------
function tamam() {
  console.log("tamam");
}
// ------------------------------------------------------------------------------------------------------------

// والحمد لله رب العالمين
// أكملته 12-6-2023 الساعة 05:29 عصرا
