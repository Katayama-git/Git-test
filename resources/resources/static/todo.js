document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = 'login.html';
        return;
    }

    fetch(`/api/todos/${userId}`)
    .then(response => response.json())
    .then(data => {
        const todoList = document.getElementById('todoList');
        data.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = `${todo.content} - ${todo.dueDate}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                fetch(`/api/todos/${todo.id}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    li.remove();
                });
            };
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    });

    document.getElementById('todoForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const content = document.getElementById('content').value;
        const dueDate = document.getElementById('dueDate').value;

        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, content, dueDate })
        })
        .then(response => response.json())
        .then(data => {
            const todoList = document.getElementById('todoList');
            const li = document.createElement('li');
            li.textContent = `${data.content} - ${data.dueDate}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                fetch(`/api/todos/${data.id}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    li.remove();
                });
            };
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    });
});
