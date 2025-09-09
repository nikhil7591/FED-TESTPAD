document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = document.getElementById("task-input").value.trim();
    if (taskText !== "") {
        addTask(taskText);
        document.getElementById("task-input").value = "";
    }
});

function addTask(taskText) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed", checkbox.checked);
    });

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#10005;";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(checkbox);
    li.appendChild(deleteBtn);

    document.getElementById("task-list").appendChild(li);
}
