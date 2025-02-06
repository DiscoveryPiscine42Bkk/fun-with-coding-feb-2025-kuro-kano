$(document).ready(function () {
    const savedTodos = getCookie('todos');
    if (savedTodos) {
        const todoList = JSON.parse(savedTodos);
        todoList.forEach(todo => addTodoToDOM(todo));
    }

    $('#new-btn').click(function () {
        const todoText = prompt('Enter your new TO DO:');
        if (todoText) {
            addTodoToDOM(todoText);
            saveTodos();
        }
    });

    function addTodoToDOM(todoText) {
        const $todoDiv = $('<div>').addClass('todo-item').text(todoText);

        $todoDiv.click(function () {
            const confirmDelete = confirm('Do you really want to delete this TO DO?');
            if (confirmDelete) {
                $(this).remove();
                saveTodos();
            }
        });

        $('#ft_list').prepend($todoDiv);
    }

    function saveTodos() {
        const todos = [];
        $('.todo-item').each(function () {
            todos.unshift($(this).text());
        });
        setCookie('todos', JSON.stringify(todos), 7);
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const parts = cookies[i].split('=');
            if (parts[0] === name) return decodeURIComponent(parts[1]);
        }
        return null;
    }
});
