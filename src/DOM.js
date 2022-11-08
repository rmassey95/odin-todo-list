import { displayForm, taskList, Task, updateTask } from './modules/tasks';
const _ = require('lodash');


const DOM = (() => {
  const mainContent = document.querySelector('.main-content');
  
  const btnClick = () => {
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
        taskList.add(Task(index,inputs[0].value, inputs[1].value, select.value, inputs[2].value, inputs[3].value));
        index++;
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
    
      displayTasks(taskList.getTaskList());
    });

    remove.addEventListener('click', (e) => {
      e.preventDefault();
      const inputs = document.querySelectorAll('input');
      const select = document.querySelector('#prio');
    
      taskList.removeTask(parseInt(document.querySelector('#index').value));
      document.querySelector('.form-container').style.display = 'none';
      
      displayTasks(taskList.getTaskList());
      inputs.forEach(input => {
        input.value = '';
      });
      select.value = 'high';
      document.querySelector('.delete').style.display = 'none';
    })

    allTasks.addEventListener('click', (e) => {
      clearScreen();
    
      displayTasks(taskList.getTaskList());
    })
    
    projs.addEventListener('click', () => {
      clearScreen();
    
      displayProjs(taskList.getTaskList());
    })
    
    displayTasks(taskList.getTaskList());

  }

  const displayTasks = (tasks) => {
    taskList.saveTasks();
    const btn = taskBtn();
    mainContent.innerHTML = '';
    tasks.forEach(task => {
      const title = document.createElement('button');
      title.classList.add('btn');
      title.dataset.id = task.i;
      title.innerText = task.title;

      if (task.prio === 'high'){
        title.classList.add('high');
      } else if (task.prio === 'med'){
        title.classList.add('med');
      }

      mainContent.appendChild(title);
    });
    addClicker();
    mainContent.appendChild(btn);
  }

  const displayProjs = (tasks) => {

    const projects = _.groupBy(tasks, 'proj');

    const projNames = Object.keys(projects);

    projNames.forEach(key => {
      if (key != '') {
        const paraHeader = document.createElement('h2');
        paraHeader.innerText = key;

        mainContent.appendChild(paraHeader);

        for (const task of projects[key]) {
          const title = document.createElement('button');
          title.classList.add('btn');
          title.dataset.id = task.i;
          title.innerText = task.title;

          title.addEventListener('click', (e) => {
            displayEdit(e.target.dataset.id);
          })

          mainContent.appendChild(title);
        }
      }
    });

  }

  const addClicker = () => {
    const btns = document.querySelectorAll('.btn');
    for (const btn of btns) {
      btn.addEventListener('click', (e) => {
        displayEdit(e.target.dataset.id);
      });
    };
  };

  const displayEdit = (id) => {
    
    const tasks = taskList.getTaskList();
    const task = tasks.find(({i}) => i === parseInt(id));

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.id === 'title'){
        input.value = task.title;
      } else if (input.id === 'desc'){
        input.value = task.desc;
      } else if (input.id === 'prio'){
        input.value = task.prio;
      } else if (input.id === 'proj'){
        input.value = task.proj;
      } else if (input.id === 'date'){
        input.value = task.dueDate;
      } else {
        input.value = task.i;
      }
    });

    displayForm();

  }

  const taskBtn = () => {
    const btn = document.createElement('button');
    btn.classList.add('add-task');
    btn.innerText = 'Add Task';

    btn.addEventListener('click', (e) => {
      displayForm();
    });

    return btn
  }

  const clearScreen = () => {
    mainContent.innerHTML = '';
    const btn = taskBtn();
  };

  return {displayTasks, btnClick};
})();

export {DOM};