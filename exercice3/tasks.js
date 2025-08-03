const fs = require('fs');
const path = './tasks.json';

function loadTasks() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, '[]');
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function saveTasks(tasks) {
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}

function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: Date.now(),
    description,
    status: 'à faire',
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log('Tâche ajoutée.');
}

function listTasks(filter = 'toutes') {
  const tasks = loadTasks();
  let filtered = tasks;
  if (filter === 'faites') filtered = tasks.filter(t => t.status === 'faite');
  else if (filter === 'non faites') filtered = tasks.filter(t => t.status === 'à faire');

  if (filtered.length === 0) return console.log('Aucune tâche à afficher.');

  filtered.forEach(task =>
    console.log(`[${task.status === 'faite' ? '✔' : ' '}] ${task.id} - ${task.description}`)
  );
}

function markTaskDone(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.status = 'faite';
    saveTasks(tasks);
    console.log('Tâche marquée comme faite.');
  } else {
    console.log('Tâche introuvable.');
  }
}

function deleteTask(id) {
  let tasks = loadTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id != id);
  if (tasks.length < initialLength) {
    saveTasks(tasks);
    console.log('Tâche supprimée.');
  } else {
    console.log('Tâche introuvable.');
  }
}

module.exports = {
  addTask,
  listTasks,
  markTaskDone,
  deleteTask,
};