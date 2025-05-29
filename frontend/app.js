const API_URL = "http://localhost:5000/tasks";

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tasks = await response.json();
        renderTaskList(tasks);
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        alert('Unable to load tasks. Please try again later.');
    }
}

async function addTask() {
    const name = document.getElementById("taskName").value.trim();
    if (!name) return;
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        document.getElementById("taskName").value = ""; // Clear input field
        fetchTasks();
    } catch (error) {
        console.error('Failed to add task:', error);
        alert('Unable to add the task. Please try again later.');
    }
}

async function incrementTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/${taskId}/increment`, { method: "POST" });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchTasks();
    } catch (error) {
        console.error('Failed to increment task:', error);
        alert('Unable to increment the task. Please try again later.');
    }
}

async function decrementTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/${taskId}/decrement`, { method: "POST" });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchTasks();
    } catch (error) {
        console.error('Failed to decrement task:', error);
        alert('Unable to decrement the task. Please try again later.');
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchTasks();
    } catch (error) {
        console.error('Failed to delete task:', error);
        alert('Unable to delete the task. Please try again later.');
    }
}

function renderTaskList(tasks) {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";
    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <span>${task.name} - Count: ${task.count}</span>
            <button onclick="incrementTask(${task.id})">Increment</button>
            <button onclick="decrementTask(${task.id})">Decrement</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

// Fetch and render initial task list
fetchTasks();
