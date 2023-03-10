// This is the beginning of the script where the document's "DOMContentLoaded" event is being listened for.
document.addEventListener("DOMContentLoaded", function() {
    let todoForm = document.getElementById("newTDF");
    let tdl = document.getElementById("tdl");
  
    // This is the event listener for when the user submits a new task through the todo form.
    todoForm.addEventListener("submit", function(event) { 
      event.preventDefault();
      const liPack = document.createElement('div'); 
      liPack.classList.add('ntd');
  
      const newTodo = document.createElement("li");
      newTodo.classList.add('noDupe');
      newTodo.innerText = document.getElementById("task").value;   
      // This conditional checks if the user has entered a task before allowing it to be added to the to-do list.
      if (!newTodo.innerText){alert("Please enter a task."); return;} 
      let todoCheck = newTodo.innerText;   
  
      liPack.appendChild(newTodo);
      let dupArray = Array.from(document.getElementsByClassName('noDupe'));
      let isDuplicate = false; 
      // This loop checks if a task with the same name already exists on the to-do list.
      for (const dup of dupArray) {
        if (todoCheck === dup.textContent) {
          isDuplicate = true;
          break;
        }
      }
      // If a duplicate task exists, an alert will be displayed.
      if (isDuplicate) {
        alert("Task already exists.");  
      } else {
        // // If the task is not a duplicate, it will be added to the to-do list.
        tdl.appendChild(liPack);   
        handleNewTodo();
      } 
      todoForm.reset();
      // This function adds the "Remove Todo" button to each task on the to-do list.
      addRem(); 
    });
  
    // This is the event listener for when a task is clicked on the to-do list.
    tdl.addEventListener("click", function(event) {
      const clickedElement = event.target;
      if (clickedElement.tagName.toLowerCase() === "li") {
        clickedElement.style.textDecoration = "line-through";
        //
        todoComplete(event)
      }
    });
  });
  
  // This is the function that adds the "Remove Todo" button to each task on the to-do list.
  function addRem() {  
    const tdl = document.querySelector("#tdl");
    const liElements = tdl.querySelectorAll(".ntd"); 
    for (let i = 0; i < liElements.length; i++) {
      const li = liElements[i];
      if (!li.querySelector("button")) {  
        let removeButton = document.createElement("button"); 
        removeButton.innerText = "Remove Todo";
        removeButton.classList.add("RemoveMe"); 
        // This event listener removes the task from the to-do list and deletes its associated data from local storage.
        removeButton.addEventListener('click', function(event){
          this.parentElement.remove();
          const todoText = this.parentElement.innerText.split("Remove Todo")[0];
          localStorage.removeItem(todoText);
        })
        li.appendChild(removeButton);
      }
    }
  } 
  
  // Ease of Use Buttons
  const showls = document.getElementById("showls");
  showls.addEventListener('click', function(){
    console.log(localStorage)
  })
  
  const clearls = document.getElementById("clearls");
  clearls.addEventListener('click', function(){
    localStorage.clear()
  })
  
  const refresh = document.getElementById("refresh");
  refresh.addEventListener('click', function(){
    location.reload()
  }) 
   