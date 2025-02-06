
window.onload = function () {
    const savedTodos = getCookie('todos');
    if (savedTodos) {
        const todoList = JSON.parse(savedTodos);
        todoList.forEach(todo => addTodoToDOM(todo));
    }
};

document.getElementById('new-btn').addEventListener('click', function () {
    const todoText = prompt('Enter your new TO DO:');
    if (todoText) {
        addTodoToDOM(todoText);
        saveTodos();
    }
});

function addTodoToDOM(todoText) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = todoText;

    todoDiv.addEventListener('click', function () {
        const confirmDelete = confirm('Do you really want to delete this TO DO?');
        if (confirmDelete) {
            todoDiv.remove();
            saveTodos();
        }
    });

    const ftList = document.getElementById('ft_list');
    ftList.insertBefore(todoDiv, ftList.firstChild);
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        todos.unshift(item.textContent);
    });
    setCookie('todos', JSON.stringify(todos), 7);
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const encodedValue = encodeURIComponent(value);
    document.cookie = `${name}=${encodedValue};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const parts = cookies[i].split('=');
        if (parts[0] === name) return decodeURIComponent(parts[1]);
    }
    return null;
}
