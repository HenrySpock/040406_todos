const tdl = document.getElementById("tdl");

// This function updates the list of todos displayed on the page with todos saved in the local storage.
function updateListFromLocalStorage() {
  tdl.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    // get the key of the i-th item in local storage
    const key = localStorage.key(i);
    // get the value of the i-th item and parse it from a JSON string to an object
    const value = JSON.parse(localStorage.getItem(key));
    const liPack = document.createElement('div');
    liPack.classList.add('ntd');
    const newTodo = document.createElement('li');
    newTodo.classList.add('noDupe');
    newTodo.innerText = key;
    // if the todo is completed, set its style to "line-through"
    if (value.isCompleted === true) {
      newTodo.style.textDecoration = 'line-through';
    }
    liPack.appendChild(newTodo);
    tdl.appendChild(liPack);
    // add event listeners for removing and completing todos
    addRem();
  }
}

// call the function to update the list when the page is loaded
updateListFromLocalStorage();

// This function saves a new todo in the local storage
function handleNewTodo() {
  const newTodoText = document.getElementById('task').value;
  const newTodo = { text: newTodoText, isCompleted: false };
  // save the todo as a JSON string in the local storage with its text as the key
  localStorage.setItem(newTodoText, JSON.stringify(newTodo));
} 

// This function marks a todo as completed in the local storage
function todoComplete(event) {
  const clickedElement = event.target;
  // get the closest li element that contains the clicked element
  const clickedTodo = clickedElement.closest('.noDupe');
  if (!clickedTodo) return;
  // set the style of the todo to "line-through"
  clickedElement.style.textDecoration = "line-through";
  const todoText = clickedTodo.innerText;
  // get the todo object from the local storage using its text as the key and mark it as completed
  const todo = JSON.parse(localStorage.getItem(todoText));
  todo.isCompleted = true;
  // save the updated todo in the local storage
  localStorage.setItem(todoText, JSON.stringify(todo));
}