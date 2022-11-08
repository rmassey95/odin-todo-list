import { displayForm, Task, taskList, updateTask, removeTask} from './modules/tasks';
import { DOM } from './DOM'

let index = 0;

const formSubmit = document.querySelector('.form-submit');
const remove = document.querySelector('.delete');
const allTasks = document.querySelector('#tasks');
const projs = document.querySelector('#proj');

formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll('input');
  const select = document.querySelector('#prio');
  const tasks = taskList.getTaskList();

  if (inputs[4].value === ''){
    const task = Task(index,inputs[0].value, inputs[1].value, select.value, inputs[2].value, inputs[3].value);
    index++;
    taskList.add(task);
  } else {
    const task = tasks.find(({i}) => i === parseInt(inputs[4].value));
    updateTask.updateTitle(task, inputs[0].value);
    updateTask.updateDesc(task, inputs[1].value);
    updateTask.updateProj(task, inputs[2].value);
    updateTask.updatePrio(task, select.value);
    updateTask.updateDate(task, inputs[3].value);
  };

  document.querySelector('.form-container').style.display = 'none';
  inputs.forEach(input => {
    input.value = '';
  });

  select.value = 'high';

  DOM.displayTasks(taskList.getTaskList());
})

remove.addEventListener('click', (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll('input');

  taskList.removeTask(parseInt(document.querySelector('#index').value));
  document.querySelector('.form-container').style.display = 'none';
  
  DOM.displayTasks(taskList.getTaskList());
  inputs.forEach(input => {
    input.value = '';
  });
  document.querySelector('.delete').style.display = 'none';
})

allTasks.addEventListener('click', (e) => {
  DOM.clearScreen();

  DOM.displayTasks(taskList.getTaskList());
})

projs.addEventListener('click', () => {
  DOM.clearScreen();

  DOM.displayProjs(taskList.getTaskList());
})

taskList.pageLoadTasks();

DOM.displayTasks(taskList.getTaskList());