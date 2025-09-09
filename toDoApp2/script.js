function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    const tasks = loadTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks(tasks);
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.name;

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.innerHTML = "✏️";
        editBtn.addEventListener("click", () => {
            const newName = prompt("Update task name:", task.name);
            if (newName && newName.trim() !== "") {
                tasks[index].name = newName.trim();
                saveTasks(tasks);
                renderTasks();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.innerHTML = "❌";
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function addTask(taskName) {
    const tasks = loadTasks();
    tasks.push({ name: taskName, completed: false });
    saveTasks(tasks);
    renderTasks();
}

document.getElementById("task-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const taskName = this.value.trim();
        if (taskName !== "") {
            addTask(taskName);
            this.value = "";
        }
    }
});

renderTasks();
