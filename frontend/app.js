const API_URL = "http://localhost:5000/tasks";

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task.name} - Count: ${task.count} 
                        <button onclick="incrementTask(${task.id})">+</button>`;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const name = document.getElementById("taskName").value;
    if (!name) return;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    });

    fetchTasks();
}

async function incrementTask(taskId) {
    await fetch(`${API_URL}/${taskId}/increment`, { method: "POST" });
    fetchTasks();
}

fetchTasks();
