document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');
    const toggleTasksButton = document.getElementById('toggleTasksButton');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        if (tasks.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
            tasks.forEach(function(task, index) {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                taskItem.innerHTML = `
                    <span class="task-text">${task}</span>
                    <div class="task-buttons">
                        <button class="done-btn" onclick="toggleTaskCompletion(${index})">&#10003;</button>
                        <button class="edit-btn" onclick="openTaskEditor(${index})">&#9998;</button>
                        <button class="delete-btn" onclick="deleteTask(${index})">&#10005;</button>
                    </div>
                `;
                taskList.appendChild(taskItem);
            });
        }
    }

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
        }
    });

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    window.toggleTaskCompletion = function(index) {
        const taskItem = taskList.children[index];
        taskItem.classList.toggle('completed');
    }

    window.openTaskEditor = function(index) {
        const taskItem = taskList.children[index];
        const taskText = taskItem.querySelector('.task-text').textContent;
        const editorHTML = `
            <div class="task-editor">
                <input type="text" class="edit-task-input" value="${taskText}">
                <button class="save-btn" onclick="saveTask(${index})">Submit</button>
                <button class="cancel-btn" onclick="cancelEdit(${index})">Cancel</button>
            </div>
        `;
        taskItem.insertAdjacentHTML('afterend', editorHTML);
        const taskEditor = taskItem.nextElementSibling;
        taskEditor.style.display = 'flex';
    }

    window.saveTask = function(index) {
        const taskEditor = taskList.children[index].nextElementSibling;
        const editedTask = taskEditor.querySelector('.edit-task-input').value;
        tasks[index] = editedTask;
        renderTasks();
    }

    window.cancelEdit = function(index) {
        const taskEditor = taskList.children[index].nextElementSibling;
        taskEditor.remove();
    }

    toggleTasksButton.addEventListener('click', function() {
        if (taskList.classList.contains('show')) {
            taskList.classList.remove('show');
            taskList.classList.add('hide');
            toggleTasksButton.textContent = 'Show';
        } else {
            taskList.classList.remove('hide');
            taskList.classList.add('show');
            toggleTasksButton.textContent = 'Hide';
        }
    });

    // Show task list by default
    taskList.classList.add('show');
    renderTasks();
});
