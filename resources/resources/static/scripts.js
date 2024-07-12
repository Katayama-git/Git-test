document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const todoForm = document.getElementById('todoForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'todo.html';
                } else {
                    alert('Invalid username or password');
                }
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'login.html';
                } else {
                    alert('Registration failed');
                }
            });
        });
    }

    if (todoForm) {
        todoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const content = document.getElementById('content').value;
            const dueDate = document.getElementById('dueDate').value;

            fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content, dueDate })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadTodos();
                } else {
                    alert('Failed to add task');
                }
            });
        });

        function loadTodos() {
            fetch('/api/todos')
                .then(response => response.json())
                .then(data => {
                    const todoList = document.getElementById('todoList');
                    todoList.innerHTML = '';
                    data.forEach(todo => {
                        const li = document.createElement('li');
                        li.textContent = `${todo.content} - ${todo.dueDate}`;
                        todoList.appendChild(li);
                    });
                });
        }

        loadTodos();
    }
});
