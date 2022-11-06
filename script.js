const Task = (i, title, desc, prio) => {

  return {i, title, desc, prio};
};

const updateTask = () => {

  const updateTitle = (task, newTitle) => {
    task.title = newTitle;
  } 

  const updateDesc = (task, newDesc) => {
    task.desc = newDesc;
  }

  const updatePrio = (task, newPrio) => {
    task.prio = newPrio;
  }

  const updateIndex = (task, newI) => {
    task.i = newI;
  }

  return {updateTitle, updateDesc, updatePrio, updateIndex};
};

const userPrompt = (() => {

  const getTitle = () => {
    return prompt("Enter a title");
  }

  const getDesc = () => {
    return prompt("Enter a description");
  }

  const getPrio = () => {
    return prompt("Enter a priority");
  }

  
  return {getTitle, getDesc, getPrio}
})();

let index = 0;
const tasks = []
const update = updateTask();

while (true) {
  const cont = prompt("Add new task? (y or n)");
  if (cont === 'n'){
    break;
  }
  tasks.push(Task(index, userPrompt.getTitle(), userPrompt.getDesc(), userPrompt.getPrio()));
  index++;
}

console.log(tasks);