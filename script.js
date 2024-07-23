document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load existing todos from local storage
    loadTodos();

    // Add a new todo
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodo(todoText);
            todoInput.value = '';
        }
    });

    // Function to add a todo
    function addTodo(text) {
        const li = document.createElement('li');
        li.textContent = text;

        // Create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTodos();
        });

        li.prepend(checkbox);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
        saveTodos();
    }

    // Function to save todos to local storage
    function saveTodos() {
        const todos = [];
        const items = todoList.querySelectorAll('li');
        items.forEach(item => {
            const todoText = item.textContent.replace('Delete', '').trim();
            const completed = item.classList.contains('completed');
            todos.push({ text: todoText, completed });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Function to load todos from local storage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            addTodo(todo.text);
            if (todo.completed) {
                const lastItem = todoList.lastChild;
                lastItem.classList.add('completed');
                lastItem.querySelector('input[type="checkbox"]').checked = true;
            }
        });
    }
});