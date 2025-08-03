const inquirer = require('inquirer');

function mainMenu() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Que veux-tu faire ?',
      choices: [
        'Ajouter une tâche',
        'Voir toutes les tâches',
        'Voir tâches faites',
        'Voir tâches non faites',
        'Marquer une tâche comme faite',
        'Supprimer une tâche',
        'Quitter',
      ],
    },
  ]);
}

function askDescription() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Description de la tâche :',
    },
  ]);
}

function askId() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'ID de la tâche :',
    },
  ]);
}

module.exports = {
  mainMenu,
  askDescription,
  askId,
};
