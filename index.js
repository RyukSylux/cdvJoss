const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addition(a, b) {
    return a + b;
}

function soustraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        throw new Error('La division par zéro n\'est pas permise. Enculé !');
    }
    return a / b;
}

function menu() {
    console.log('+ Addition');
    console.log('- Soustraction');
    console.log('* Multiplication');
    console.log('/ Division');
    console.log('5 Quitter');
}

function demanderChoix() {
    menu();
    rl.question('Votre choix : ', function(answer) {
        const operations = ['+', '-', '*', '/', '5'];
        answer = answer.trim();
        if (operations.includes(answer)) {
            if (answer === '5') {
                console.log('Au revoir !');
                rl.close();
                return;
            }

            demanderNombres(answer);
        } else {
            console.log('Choix invalide. Veuillez réessayer.\n');
            demanderChoix();
        }
    });
}

function demanderNombres(choix) {
    rl.question('Entrez le premier nombre : ', function(input1) {
        rl.question('Entrez le deuxième nombre : ', function(input2) {
            const a = parseFloat(input1);
            const b = parseFloat(input2);

            if (isNaN(a) || isNaN(b)) {
                console.log('Entrée invalide. Veuillez entrer des nombres valides.\n');
                demanderNombres(choix);
                return;
            }

            try {
                let resultat;

                switch (choix) {
                    case '+':
                        resultat = addition(a, b);
                        break;
                    case '-':
                        resultat = soustraction(a, b);
                        break;
                    case '*':
                        resultat = multiplication(a, b);
                        break;
                    case '/':
                        resultat = division(a, b);
                        break;
                }

                console.log('Résultat : ', resultat);
            } catch (err) {
                console.log('Erreur :', err.message);
            } finally {
                rl.close();
            }
        });
    });
}

demanderChoix();