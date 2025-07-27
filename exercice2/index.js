const fs = require('fs');
const path = require('path');
const readline = require('readline');

const scoresFilePath = path.join(__dirname, 'scores.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => {
    rl.question(query, answer => resolve(answer));
  });
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveScore(scoreData) {
  let scores = [];

  if (fs.existsSync(scoresFilePath)) {
    const data = fs.readFileSync(scoresFilePath);
    scores = JSON.parse(data);
  }

  scores.push(scoreData);
  fs.writeFileSync(scoresFilePath, JSON.stringify(scores, null, 2));
}

function difficultyLabel(choice) {
  switch (choice) {
    case '1': return 'Facile';
    case '2': return 'Moyen';
    case '3': return 'Difficile';
    default: return 'Inconnu';
  }
}

async function playGame(difficulty) {
  let maxNumber;
  switch (difficulty) {
    case '1':
      maxNumber = 50;
      break;
    case '2':
      maxNumber = 100;
      break;
    case '3':
      maxNumber = 500;
      break;
    default:
      console.log("Choix invalide. Jeu en mode 'moyen' par défaut.");
      maxNumber = 100;
  }

  const mysteryNumber = generateRandomNumber(1, maxNumber);
  let attempts = 0;
  let guess;

  console.log(`\nDevine le nombre entre 1 et ${maxNumber}`);

  while (true) {
    const input = await askQuestion('Ton choix : ');
    guess = parseInt(input, 10);

    if (isNaN(guess)) {
      console.log('Veuillez entrer un nombre valide.');
      continue;
    }

    attempts++;

    if (guess < mysteryNumber) {
      console.log('Trop petit !');
    } else if (guess > mysteryNumber) {
      console.log('Trop grand !');
    } else {
      break;
    }
  }

  console.log(`Bravo ! Tu as trouvé le nombre mystère (${mysteryNumber}) en ${attempts} tentative(s).`);

  saveScore({
    date: new Date().toLocaleString(),
    difficulty: difficultyLabel(difficulty),
    mysteryNumber,
    attempts
  });
}

async function askReplay() {
  const answer = await askQuestion('\nVeux-tu rejouer ? (o/n) : ');
  return answer.trim().toLowerCase() === 'o';
}

async function startGame() {
  console.log('Bienvenue dans le jeu du Nombre Mystère !');

  let playAgain = true;
  while (playAgain) {
    console.log('\nChoisis un niveau de difficulté :');
    console.log('1. Facile (1-50)');
    console.log('2. Moyen (1-100)');
    console.log('3. Difficile (1-500)');

    const difficulty = await askQuestion('Ton choix (1/2/3) : ');

    await playGame(difficulty);
    playAgain = await askReplay();
  }

  console.log('\nMerci d\'avoir joué ! À bientôt.');
  rl.close();
}

startGame();