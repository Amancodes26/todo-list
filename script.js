const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Function to create task with edit and delete buttons
function createTask(taskText) {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;

    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener('click', () => {
        const updatedText = prompt("Enter updated task:", taskText);
        if (updatedText !== null) {
            span.textContent = updatedText;

            // Update task in local storage
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.map(task => {
                if (task === taskText) {
                    return updatedText;
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem);

        // Remove task from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    });

    listItem.appendChild(span);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Load tasks from local storage when the page loads
window.addEventListener('load', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(savedTask => {
        createTask(savedTask);
    });
});

addBtn.addEventListener('click', () => {
    if (taskInput.value !== "") {
        const taskText = taskInput.value;
        createTask(taskText);

        // Save tasks to local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = "";
    }
});


