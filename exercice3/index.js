const { mainMenu, askDescription, askId } = require('./utils');
const { addTask, listTasks, markTaskDone, deleteTask } = require('./tasks');

async function app() {
  let exit = false;

  while (!exit) {
    const { action } = await mainMenu();

    switch (action) {
      case 'Ajouter une tâche':
        const { description } = await askDescription();
        addTask(description);
        break;
      case 'Voir toutes les tâches':
        listTasks('toutes');
        break;
      case 'Voir tâches faites':
        listTasks('faites');
        break;
      case 'Voir tâches non faites':
        listTasks('non faites');
        break;
      case 'Marquer une tâche comme faite':
        const { id: doneId } = await askId();
        markTaskDone(doneId);
        break;
      case 'Supprimer une tâche':
        const { id: delId } = await askId();
        deleteTask(delId);
        break;
      case 'Quitter':
        exit = true;
        console.log('Bye !');
        break;
    }
  }
}

app();