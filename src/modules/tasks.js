import uniqid from "uniqid";

const Task = (i, title, desc, prio, proj, dueDate) => {
  return { i, title, desc, prio, proj, dueDate };
};

const updateTask = (() => {
  const updateTitle = (task, newTitle) => {
    task.title = newTitle;
  };

  const updateDesc = (task, newDesc) => {
    task.desc = newDesc;
  };

  const updatePrio = (task, newPrio) => {
    task.prio = newPrio;
  };

  const updateProj = (task, newProj) => {
    task.proj = newProj;
  };

  const updateDate = (task, newDate) => {
    task.dueDate = newDate;
  };

  const updateIndex = (task, newI) => {
    task.i = newI;
  };

  return {
    updateTitle,
    updateDesc,
    updatePrio,
    updateIndex,
    updateProj,
    updateDate,
  };
})();

const taskList = (() => {
  let tasks = [];

  function add(task) {
    tasks.push(task);
  }

  const taskLength = () => tasks.length;

  const removeTask = (index) => {
    const arrIndex = getTaskList().findIndex((x) => x.i === index);
    tasks.splice(arrIndex, 1);
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const pageLoadTasks = () => {
    const results = JSON.parse(localStorage.getItem("tasks"));

    tasks = results;
  };

  const getTaskList = () => tasks;

  return { add, getTaskList, removeTask, saveTasks, pageLoadTasks, taskLength };
})();

const displayForm = () => {
  const idInput = document.querySelector("#index");
  const formDiv = document.querySelector(".form-container");
  formDiv.style.display = "block";

  if (idInput.value === "") {
    //
  } else {
    document.querySelector(".delete").style.display = "inline-block";
  }
};

export { displayForm, Task, taskList, updateTask };
