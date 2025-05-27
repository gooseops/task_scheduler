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

function renderTaskList(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
            <span>${task.name}</span>
            <span class="count">Count: ${task.count}</span>
            <button onclick="incrementTask(${task.id})" class="increment-btn">+</button>
        `;
        taskList.appendChild(li);
    });
}

fetchTasks();
