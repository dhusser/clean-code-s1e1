var taskInput = document.getElementById('new-task');
var addButton = document.getElementsByTagName('button')[0];
var incompleteTaskHolder = document.getElementById('current-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');

var createNewTaskElement = function (taskString) {

  var listItem = document.createElement('li');
  listItem.className = 'task';

  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');
  var deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task__label';

  checkBox.type = 'checkbox';
  checkBox.className = 'task__checkbox';
  editInput.type = 'text';
  editInput.className = 'task__input';

  editButton.innerText = 'Edit';
  editButton.className = 'button button_edit';

  deleteButton.className = 'button button_delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'remove task';
  deleteButtonImg.className = 'remove';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function () {

  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var editBtn = listItem.querySelector('.button_edit');
  var containsClass = listItem.classList.contains('task_edit');

  if (containsClass) {

    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('task_edit');
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {
  console.log('AJAX Request');
}

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector('.task__checkbox');
  var editButton = taskListItem.querySelector('.button_edit');
  var deleteButton = taskListItem.querySelector('.button_delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}