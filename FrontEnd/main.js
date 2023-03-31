const form = document.querySelector('#task-form');
const input = document.querySelector('#list-input');
const list = document.querySelector('#generated-List');
const checked = document.querySelector('#Checkbox')
const checkAll = document.querySelector('#checkbox-all');
const showAll = document.querySelector('#show-all');
const showActive = document.querySelector('#show-active');
const showCompleted = document.querySelector('#show-completed');
const showbuttons = document.querySelector(".button-container");
const clearCompleted = document.querySelector('#clear-completed');
const itemsCounter = document.querySelector('#items-counter');

function hideButtons() {
  showbuttons.classList.add("hidden")
  checkAll.classList.add("hidden")
}

function showButtons() {
  showbuttons.classList.remove("hidden")
  clearCompleted.classList.add("hidden-button")
  checkAll.classList.remove("hidden")
}

function displayTaskAmount() {
  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  let unchecked = 0;
  for (let i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].checked) {
      unchecked++;
    }
  }
  document.getElementById("amount").innerText = unchecked + " items left";
}

hideButtons();

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const inputValue = input.value;
  //Skappa en p tagg även!
  const listItem = document.createElement('li');
  listItem.className = 'user-task';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  checkbox.addEventListener('change', (event => {
    if (event.target.checked) {
      clearCompleted.classList.remove("hidden-button")
      taggElement.classList.add("crossed")
      displayTaskAmount();
    }
    else {
      taggElement.classList.remove("crossed")
      let checkboxes = document.querySelectorAll('input[type=checkbox]');
      let counter = 0;
        for(let i = 0; i < checkboxes.length; i++){
          if (checkboxes[i].checked===true){
            counter++;
          }
        }
      if (counter === 0){
        clearCompleted.classList.add("hidden-button");
      }
      else{
        clearCompleted.classList.remove("hidden-button");
      }
      displayTaskAmount();
    }
  }))

  let taggElement = document.createElement('p')
  taggElement.classList.add('taskLabel')
  taggElement.textContent = inputValue;

  const deleteButton = document.createElement('input');
  deleteButton.type = 'button';
  deleteButton.className = 'delete';
  deleteButton.value = '❌';

  deleteButton.addEventListener('click', function () {
    listItem.remove();
    if (list.childElementCount === 0) {
      hideButtons();
    }
    displayTaskAmount();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taggElement);
  listItem.appendChild(deleteButton);
  list.appendChild(listItem);
  input.value = '';
  showButtons();
  displayTaskAmount();
});

checkAll.addEventListener('click', function (event) {
  event.preventDefault();
  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  let paragraphs = document.querySelectorAll('p.taskLabel');
  let counter = 0;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === true) {
      counter++;
    }
  }
  if (counter === checkboxes.length) {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      clearCompleted.classList.add("hidden-button")
      paragraphs[i].classList.remove('crossed')
    }
  } else {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
      clearCompleted.classList.remove("hidden-button")
      paragraphs[i].classList.add('crossed')
    }
  }
  displayTaskAmount();
});


//https://www.w3schools.com/howto/howto_js_display_checkbox_text.asp
//Tittade på länken ovan för att förstå hur man displayade
//något baserat på iklickad checkbox.
//https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
//samt den.

showAll.addEventListener('click', function (event) {
  event.preventDefault();
  showAll.classList.add('boarded');
  showCompleted.classList.remove('boarded');
  showActive.classList.remove('boarded');

  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].parentElement.classList.remove('hidden');
  }
});

showActive.addEventListener('click', function (event) {
  event.preventDefault();
  showActive.classList.add('boarded');
  showCompleted.classList.remove('boarded');
  showAll.classList.remove('boarded');

  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === false) {
      checkboxes[i].parentElement.classList.remove('hidden');
    } else {
      checkboxes[i].parentElement.classList.add('hidden');
    }
  }
});

showCompleted.addEventListener('click', function (event) {
  event.preventDefault();
  showCompleted.classList.add('boarded')
  showAll.classList.remove('boarded');
  showActive.classList.remove('boarded');

  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === true) {
      checkboxes[i].parentElement.classList.remove('hidden');
    } else {
      checkboxes[i].parentElement.classList.add('hidden');
    }
  }
});

clearCompleted.addEventListener('click', function (event) {
  event.preventDefault();
  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  let tasksLeft = checkboxes.length;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === true) {
      checkboxes[i].parentElement.remove();
    }
  }
  if (list.childElementCount === 0) {
    hideButtons();
  }
  displayTaskAmount();
});