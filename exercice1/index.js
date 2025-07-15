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
        if (!operations.includes(answer)) {
            console.log('Choix invalide. Veuillez réessayer.\n');
            return demanderChoix();
        }

        if (answer === '5') {
            console.log('Allez degage !');
            rl.close();
            return;
        }

        demanderNombres(answer);
    });
}

function validerNombre(input) {
    const n = parseFloat(input);
    if (isNaN(n)) {
        throw new Error('Entrée invalide : ce n\'est pas un nombre.');
    }
    return n;
}

function demanderNombres(choix) {
    rl.question('Entrez le premier nombre : ', function(input1) {
        rl.question('Entrez le deuxième nombre : ', function(input2) {
            try {
                const a = validerNombre(input1);
                const b = validerNombre(input2);

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

                console.log('Résultat :', resultat);
                demanderChoix();
            } catch (err) {
                console.error('Erreur :', err.message + '\n');
                return demanderNombres(choix);
            }
        });
    });
}

demanderChoix();