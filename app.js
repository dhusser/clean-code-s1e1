const newTaskInput = document.getElementById('new-task'),
      addButton = document.querySelector('.button'),
      incompleteTaskHolder = document.getElementById('current-tasks'),
      completedTasksHolder = document.getElementById('completed-tasks');

function createNewTaskElement(taskString) {
  const listItem = createElementWithClass('li', 'task'),
        checkBox = createElementWithClass('input', 'task__checkbox'),
        label = createElementWithClass('span', 'task__name'),
        editInput = createElementWithClass('input', 'task__input'),
        editButton = createElementWithClass('button', 'button button_edit'),
        deleteButton = createElementWithClass('button', 'button button_delete'),
        deleteButtonImg = createElementWithClass('img', 'remove');

  label.innerText = taskString;
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editButton.innerText = 'Edit';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'remove task';
  deleteButton.append(deleteButtonImg);
  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
}

function addTask() {
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
  newTaskInput.value = '';
}

addButton.addEventListener('click', addTask);

function createElementWithClass(tagName, classes) {
  const element = document.createElement(tagName);
  element.className = classes;
  return element;
}

function setButtonText(element, text) {
  element.innerText = text;
}

function editTask() {
  const listItem = this.parentNode,
        editInput = listItem.querySelector('.task__input'),
        label = listItem.querySelector('.task__name'),
        editBtn = listItem.querySelector('.button_edit'),
        containsClass = listItem.classList.contains('task_edit');

  if (containsClass) {
    label.innerText = editInput.value;
    setButtonText(editBtn, 'Edit');
  } else {
    editInput.value = label.innerText;
    setButtonText(editBtn, 'Save');
  }

  listItem.classList.toggle('task_edit');
};

function removeElement(element) {
  element.parentNode.removeChild(element);
}

function deleteTask() {
  const listItem = this.parentNode;
  removeElement(listItem);
}

function taskCompleted() {
  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  const listItem = this.parentNode;
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('.task__checkbox'),
        editButton = taskListItem.querySelector('.button_edit'),
        deleteButton = taskListItem.querySelector('.button_delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.onchange = checkBoxEventHandler;
}

function bindTasks(holder, handler) {
  for (let child of holder.children) {
    bindTaskEvents(child, handler);
  }
}

bindTasks(incompleteTaskHolder, taskCompleted);
bindTasks(completedTasksHolder, taskIncomplete);