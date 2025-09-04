const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");

let currentEditSpan = null; // store which task is being edited

// ✅ Function to show a specific message (only one at a time)
function showMessage(id) {
  document.getElementById("addMessage").style.display = "none";
  document.getElementById("updateMessage").style.display = "none";
  document.getElementById("deleteMessage").style.display = "none";

  const msg = document.getElementById(id);
  if (!msg) return;

  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 2000);
}

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = taskDateTime.value;
  const priority = taskPriority.value;

  if (taskText === "" || taskDate === "") {
    alert("Please enter a task and select date & time!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="task-info">
      <span>${taskText}</span>
      <small>📅 ${new Date(taskDate).toLocaleString()}</small>
      <small class="priority ${priority.toLowerCase()}">Priority: ${priority}</small>
    </div>
    <div class="actions">
      <button class="complete-btn" onclick="completeTask(this)">✔</button>
      <button class="edit-btn" onclick="editTask(this)">✏</button>
      <button class="delete-btn" onclick="deleteTask(this)">✖</button>
    </div>
  `;

  li.dataset.time = taskDate;
  li.dataset.text = taskText;

  taskList.appendChild(li);

  taskInput.value = "";
  taskDateTime.value = "";
  taskPriority.value = "Low";

  showMessage("addMessage");
}

function completeTask(button) {
  const li = button.parentElement.parentElement;
  li.classList.toggle("completed");
}

function deleteTask(button) {
  const li = button.parentElement.parentElement;
  taskList.removeChild(li);
  showMessage("deleteMessage");
}

// ✅ Open modal when editing
function editTask(button) {
  const li = button.parentElement.parentElement;
  const span = li.querySelector("span");
  currentEditSpan = span;

  document.getElementById("editModal").style.display = "flex";
  document.getElementById("editInput").value = span.textContent;
}

// ✅ Save edited task
function saveEdit() {
  const newTask = document.getElementById("editInput").value.trim();
  if (newTask !== "" && currentEditSpan) {
    currentEditSpan.textContent = newTask;
    showMessage("updateMessage");
  }
  closeModal();
}

// ✅ Close modal
function closeModal() {
  document.getElementById("editModal").style.display = "none";
  currentEditSpan = null;
}
