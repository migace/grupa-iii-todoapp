const inputEl = document.getElementById("todo-input");
const addBtnEl = document.getElementById("todo-add");
const todosListEl = document.getElementById("todo-list");

// { id: "", text: "", isDone: false }
let todos = [];
let index = 0;

// 1. po naciśnięciu przycisku pobierz wartość z inputa
// 2. wyczyść input
// 3. dodaj wartość z inputa do listy

addBtnEl.addEventListener("click", function () {
  const todoText = inputEl.value;

  inputEl.value = "";
  addTodo(todoText);
  printTodos(todos);
});

function addTodo(text) {
  todos.push({
    id: index++,
    text: text,
    isDone: false,
  });
}

// find item with id todoId and changes flag isDone
function completeTodo(todoId) {
  const newTodos = todos.map(function (item) {
    if (item.id === todoId) {
      return {
        id: item.id,
        text: item.text,
        isDone: true,
      };
    }

    return item;
  });

  todos = newTodos;
}

// find item with todoId and remove
function removeTodo(todoId) {
  const filteredTodos = todos.filter(function (item) {
    return item.id !== todoId;
  });

  todos = filteredTodos;
}

function addClickHandlerForCompleteButtons() {
  Array.from(document.getElementsByClassName("todo-complete")).forEach(
    function (button) {
      button.addEventListener("click", function () {
        // console.log(button.dataset.id);
        const todoId = parseInt(button.dataset.id);

        completeTodo(todoId);
        printTodos(todos);
      });
    }
  );
}

function addClickHandlerForRemoveButtons() {
  Array.from(document.getElementsByClassName("todo-remove")).forEach(function (
    button
  ) {
    button.addEventListener("click", function () {
      const todoId = parseInt(button.dataset.id);

      removeTodo(todoId);
      printTodos(todos);
    });
  });
}

function printTodos(data) {
  let result = "";

  data.forEach(function (item) {
    result += `
        <div class="todo-item ${item.isDone ? "done" : ""}">
            ${item.text}
            <div>
                <button class="todo-complete" data-id="${item.id}">✅</button>
                <button class="todo-remove" data-id="${item.id}">🗑️</button>
            </div>
        </div>
    `;
  });

  todosListEl.innerHTML = result;

  addClickHandlerForCompleteButtons();
  addClickHandlerForRemoveButtons();
}
