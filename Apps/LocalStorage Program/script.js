let buttons = document.querySelectorAll(".spans span");
let result = document.querySelector(".results > span");

let input = document.querySelector("#input");
let input2 = document.querySelector("#input2");

let add1 = document.querySelector(".spans .add");
let add2 = document.querySelector(".spans .add2");

// Get input value
let inputValue = input.value;
let input2Value = input2.value;

let items = [];
window.onload = () => {
  input.focus();
};

// The Main Event, Include click event for each span
buttons.forEach((span) => {
  span.addEventListener("click", function (e) {
    // Clear result content
    result.innerHTML = "";

    // Get input value
    inputValue = input.value;
    input2Value = input2.value;

    // Click on check button
    if (e.target.classList.contains("check")) {
      switcher();
      if (inputValue !== "") {
        checkItem();
        input.value = "";
      } else {
        emptyInput();
      }

      // Click on check button first
    } else if (e.target.classList.contains("add")) {
      add1.style.display = "none";
      add2.style.display = "block";
      input2.style.display = "block";

      // Click on check button second
    } else if (e.target.classList.contains("add2")) {
      if (inputValue !== "") {
        addItem();
        input.value = "";
        input2.value = "";
        switcher();
      } else {
        emptyInput();
      }

      // Click on delete button
    } else if (e.target.classList.contains("delete")) {
      switcher();
      if (inputValue !== "") {
        deleteItem();
        input.value = "";
      } else {
        emptyInput();
      }

      // Click on show button
    } else if (e.target.classList.contains("show")) {
      switcher();
      if (localStorage.length === 0) {
        result.innerHTML = "There Is No Items";
      } else {
        showItems();
        input.value = "";
      }

      // Click on clear button
    } else if (e.target.classList.contains("clear")) {
      switcher();
      // localStorage.clear();
      if (localStorage.getItem("items")) {
        let itemsOnLocal = localStorage.getItem("items").split(",");
        for (let [key, value] of Object.entries(localStorage)) {
          if (itemsOnLocal.includes(key)) {
            localStorage.removeItem(key);
          }
        }
        localStorage.removeItem("items");
        input.value = "";
        result.innerHTML = "Local Storage Cleared";
      } else {
        result.innerHTML = "No items to delete";
      }

      // Click on unfound buttin
    } else {
      console.log("Classes Wrong");
    }
  });
});

// Func when input is empty
function emptyInput() {
  result.innerHTML = "Empty Input";
}

// Func to switch between input buttons
function switcher() {
  add1.style.display = "block";
  add2.style.display = "none";
  input2.style.display = "none";
}

// check item func
function checkItem() {
  // if item found in localstorage
  // console.log(localStorage.getItem(inputValue));
  if (localStorage.getItem(inputValue) === null) {
    result.innerHTML = `Item <span>${inputValue}</span> Not Found`;
  } else {
    // print the item key and value
    result.innerHTML = `Item: <span>${inputValue}</span> Found, With Value: <span>${localStorage
      .getItem(inputValue)
      .valueOf()}</span>`;
  }
}

// add item func
function addItem() {
  items.push(inputValue);
  console.log(items);
  localStorage.setItem("items", items);
  localStorage.setItem(inputValue, input2Value);
  result.innerHTML = `Item <span>${inputValue}</span> With Value: <span>${input2Value}</span> Added`;
  input2.style.display = "block";
}

// delete item func
function deleteItem() {
  let i = items.indexOf(inputValue);
  // console.log(items);
  if (localStorage.getItem(inputValue)) {
    localStorage.removeItem(inputValue);
    result.innerHTML = `Item <span>${inputValue}</span> Removed`;
    items.splice(i, i);
  } else {
    result.innerHTML = `Item <span>${inputValue}</span> Not Found`;
  }
}

// show items func
function showItems() {
  if (localStorage.getItem("items")) {
    let itemsOnLocal = localStorage.getItem("items").split(",");
    // loop to show keys and values
    for (let [key, value] of Object.entries(localStorage)) {
      if (itemsOnLocal.includes(key)) {
        result.innerHTML += `Key: <span class='showSpan'>${key}</span>, Value: <span class='showSpan'>${value}</span><hr></hr>`;
      }
    }
  } else {
    result.innerHTML = "There Is No Items";
  }
}
