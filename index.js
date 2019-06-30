let todoList = {
  todos: [],
  addTodo(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  updateTodo(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted(position) {
    const todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    // Get number of completed todos
    this.todos.forEach(todo => {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(todo => {
      // Case 1: if everything's true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        // Case 2: Otherwise, make everything true
        todo.completed = true;
      }
    });
  }
};

function handleKeyPress(e) {
  const key = e.key;
  if (key === 'Enter' && addTodoTextInput.value.trim().length > 0) {
    eventHandlers.addTodo();
  }
}

const addTodoTextInput = document.getElementById('addTodoTextInput');

const eventHandlers = {
  addTodo() {
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

let view = {
  displayTodos() {
    let todoUL = document.querySelector('ul');
    todoUL.innerHTML = '';
    todoUL.className = 'view';
    todoList.todos.forEach((todo, position) => {
      let todoLi = document.createElement('li');
      todoLi.className = 'round';
      let todoTextWithCompletion = '';
      let toggleBtn = this.createToggleButton();
      if (todo.completed === true) {
        toggleBtn.checked = true;
        todoLi.style.textDecoration = 'line-through';
        todoLi.style.color = 'rgb(182, 182, 182)';
        console.log(todoLi.style.textDecoration);
        todoTextWithCompletion = todo.todoText;
      } else if (todo.completed === false) {
        toggleBtn.checked = false;
        todoTextWithCompletion = todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.insertBefore(toggleBtn, todoLi.firstChild);
      todoUL.appendChild(todoLi);
    }, this);
  },
  createDeleteButton() {
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'deleteBtn';
    return deleteBtn;
  },
  createToggleButton() {
    let toggleBtn = document.createElement('input');
    toggleBtn.type = 'checkbox';
    toggleBtn.className = 'toggleBtn';
    toggleBtn.id = 'checkbox';
    return toggleBtn;
  },
  setUpEventListeners() {
    let todoUL = document.querySelector('ul');
    todoUL.addEventListener('click', event => {
      const elementClicked = event.target;
      if (elementClicked.className === 'deleteBtn') {
        eventHandlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        console.log(elementClicked.parentNode);
      }
      if (elementClicked.className === 'toggleBtn') {
        eventHandlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
