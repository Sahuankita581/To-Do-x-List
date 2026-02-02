let tasks = [];
let confettiPlayed = false;

const form = document.querySelector("form");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";

  confettiPlayed = false;

  updateTaskList();
  updateProgress();
}

function updateTaskList() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "taskItem";

    li.innerHTML = `
      <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox"
          ${task.completed ? "checked" : ""}
          onchange="toggleComplete(${index})">
        <p>${task.text}</p>
      </div>

      <div class="icons">
        <button class="edit-btn" onclick="editTask(${index})">✏</button>
        <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateProgress();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  confettiPlayed = false;
  updateTaskList();
  updateProgress();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);

  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    updateTaskList();
  }
}

function updateProgress() {
  const progressBar = document.getElementById("progress");
  const numbers = document.getElementById("numbers");

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  if (total === 0) {
    progressBar.style.width = "0%";
    numbers.textContent = "0 / 0";
    return;
  }

  const percent = (completed / total) * 100;
  progressBar.style.width = percent + "%";
  numbers.textContent = `${completed} / ${total}`;

  if (percent === 100 && !confettiPlayed) {
    blastConfetti();
    confettiPlayed = true;
  }
}

function blastConfetti() {
  const duration = 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}