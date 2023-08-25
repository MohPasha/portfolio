let input = document.querySelector(".todo-list header #input"),
  plus = document.querySelector(".todo-list header .plus"),
  tasksContainer = document.querySelector(".todo-list main"),
  task = document.querySelector(".todo-list main .task"),
  tasksCount = document.querySelector(".todo-list footer .tasks-count span"),
  deleteBtn = document.querySelectorAll(".todo-list main .delete"),
  completed = document.querySelector(".todo-list footer .completed span"),
  clearTasks = document.querySelector(".todo-list footer .clear-tasks"),
  clearCompleted = document.querySelector(".todo-list footer .clear-completed");

// Show items from local Storage
showItems();
// localStorage.clear();

localStorage.setItem("rest", "test");

// focus in input field
window.onload = () => {
  input.focus();
};

input.oninput = () => {
  document.getElementById("error").style.display = "none";
  input.style.outline = "none";
};

// When click on add's button
plus.addEventListener("click", () => {
  // get no tasks message to control it show or remove
  let noTasks = document.querySelector(".todo-list main .no-task");

  // if input value is empty
  if (input.value === "") {
    // alert user to insert some thing
    document.getElementById("error").style.display = "block";
    input.style.outline = "1px solid red";
    // console.log("Insert some thing");
    // document.body.style.outline
    // else if input not empty
  } else {
    // if no tasks msg exciste remove it
    if (noTasks) {
      noTasks.remove();
    }

    // add the item to local storage
    localStorage.setItem(input.value, "task");
    // add the item to the page
    tasksContainer.innerHTML += `<div class="task">${input.value}<span class="delete">Delete</span></div>`;

    // reset input value after adding the item
    input.value = "";
    // refocus on the input field
    input.focus();

    // calculate the tasks and show them
    calcTasks();
  }
});

// when click on delete's button
document.addEventListener("click", (e) => {
  if (e.target.className == "delete") {
    // remove the item from page
    e.target.parentNode.remove();

    // get the name by slicing the parent div's contenet example (task1delete = task1)
    eKey = e.target.parentNode.textContent.slice(0, -6);
    // remove item from local storage
    localStorage.removeItem(eKey);
    // console.log(eKey);

    if (tasksContainer.childElementCount == 0) {
      // show no tasks message
      noTasksMsg();
    }

    // calculate the tasks and show them
    calcTasks();
  }
});

// finishing tasks
document.addEventListener("click", (e) => {
  // if click target has a class (task)
  if (e.target.classList.contains("task")) {
    // toggle class (finished), if its  excistes remove it, else add it
    e.target.classList.toggle("finished");

    // add (finished) tag to a local storage
    localStorage.setItem(e.target.textContent.slice(0, -6), "finished");

    // calculate the tasks and show them
    calcTasks();
  }
});

// clear tasks
clearTasks.onclick = () => {
  // looping on local storage to remove only elemnts with tag (task) or (finished)
  for (let [key, value] of Object.entries(localStorage)) {
    if (value === "task" || value === "finished") {
      localStorage.removeItem(key);
    }
  }

  // clear the page by looping on task container's childs and remove them
  for (let item of tasksContainer.childNodes) {
    console.log(item);
    item.remove();
    // tasksContainer.firstElementChild.remove();
  }
  // show no tasks msg
  noTasksMsg();

  // calculate the tasks and show them
  calcTasks();
};

// clear finished
clearCompleted.onclick = () => {
  // get all elements which is contains class (finished)
  finished = document.querySelectorAll(".tasks-container .finished");
  // loop on them
  for (let item of finished) {
    // remove them
    item.remove();
  }

  // looping on local storage
  for (let [key, value] of Object.entries(localStorage)) {
    if (value === "finished") {
      localStorage.removeItem(key);
    }
  }

  // if tasksContainer get empty
  if (tasksContainer.childElementCount == 0) {
    noTasksMsg();
  }

  // calculate the tasks and show them
  calcTasks();
};

// show items func
function showItems() {
  let i = 0;
  if (localStorage.length === 0) {
    noTasksMsg();
  } else {
    // looping on local storage
    for (let [key, value] of Object.entries(localStorage)) {
      // if value of item is (task) or (finished)
      if (value === "task" || value === "finished") {
        //  create a div to append it on tasksContainer
        div = document.createElement("div");
        i++;
        // if value = finished
        if (value === "finished") {
          // adding classes to div
          div.classList = "task finished";
          // adding div's content
          div.innerHTML = `${key}<span class="delete">Delete</span>`;
          // append it to tasksContainer
          tasksContainer.append(div);
          i++;
        } else if (value === "task") {
          // adding classes to div
          div.classList = "task";
          // adding div's content
          div.innerHTML = `${key}<span class="delete">Delete</span>`;
          // append it to tasksContainer
          tasksContainer.append(div);
          calcTasks();
        }
      }
    }
    if (i === 0) {
      noTasksMsg();
    }
  }
}

function tamam() {
  console.log("Tamam");
}

// calculate tasks
function calcTasks() {
  // select all tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-container .task"
  ).length;

  // select all finished
  completed.innerHTML = document.querySelectorAll(
    ".tasks-container .finished"
  ).length;
}

// no tasks msg
function noTasksMsg() {
  tasksContainer.innerHTML = `<div class="no-task">No Tasks to show</div>`;
}
