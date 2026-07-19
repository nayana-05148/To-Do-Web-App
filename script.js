
let tasks = [];
let editIndex = null;

// Runs when the page loads
window.onload = function () {
    renderTasks();
};

// Clears all input fields
function clearAllInputs() {
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";
}

// Add or update task
function saveTask() {
    const nameInput = document.getElementById("taskInput").value;
    const dateInput = document.getElementById("taskDate").value;
    const timeInput = document.getElementById("taskTime").value;

    if (!nameInput.trim()) {
        alert("Please enter a task!");
        return;
    }

    if (editIndex !== null) {
        tasks[editIndex] = {
            name: nameInput,
            date: dateInput,
            time: timeInput,
            completed: tasks[editIndex].completed
        };

        editIndex = null;
        document.getElementById("addBtn").textContent = "Add Task";
    } else {
        tasks.push({
            name: nameInput,
            date: dateInput,
            time: timeInput,
            completed: false
        });
    }

    clearAllInputs();
    renderTasks();
}

// Edit task
function editTask(index) {
    editIndex = index;
    const task = tasks[index];

    document.getElementById("taskInput").value = task.name;
    document.getElementById("taskDate").value = task.date;
    document.getElementById("taskTime").value = task.time;

    document.getElementById("addBtn").textContent = "Update Task";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Toggle completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete task
function deleteTask(index) {
    if (editIndex === index) {
        editIndex = null;
        document.getElementById("addBtn").textContent = "Add Task";
    } else if (editIndex !== null && editIndex > index) {
        editIndex--;
    }

    tasks.splice(index, 1);

    clearAllInputs();
    renderTasks();
}

// Display tasks
function renderTasks() {
    const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.className = `task-item ${task.completed ? "completed-style" : ""}`;

        li.innerHTML = `
            <div class="task-title">${task.name}</div>
            <div class="task-details">
                📅 ${task.date || "No Date Specified"}<br>
                ⏰ ${task.time || "No Time Specified"}
            </div>

            <div class="btn-group">
                <button class="action-btn done-btn" onclick="toggleComplete(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                ${
                    !task.completed
                        ? `<button class="action-btn edit-btn" onclick="editTask(${index})">Edit</button>`
                        : ""
                }

                <button class="action-btn delete-btn" onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
}

