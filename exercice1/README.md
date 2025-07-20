# Calculatrice en ligne de commande (Node.js)

## Présentation

Ce projet est une calculatrice simple en ligne de commande développée avec Node.js. Elle permet d'effectuer les opérations de base : addition, soustraction, multiplication et division. L'utilisateur peut interagir via le terminal grâce au module `readline`.

## Choix techniques

- Utilisation du module natif `readline` pour lire les entrées utilisateur dans la console.
- Séparation des opérations dans des fonctions dédiées : `addition`, `soustraction`, `multiplication`, `division`.
- Mise en place d’un menu interactif et d’une validation des entrées utilisateurs (opération et nombres).
- Gestion des erreurs avec des `try/catch`, notamment pour la division par zéro et les entrées non numériques.

## Difficultés rencontrées

- Gérer correctement les appels imbriqués de `rl.question()` pour demander les deux nombres, tout en capturant les erreurs éventuelles et en relançant la saisie si besoin.
- Assurer une boucle de dialogue fluide tout en gardant un code lisible (fonction récursive)

## Ce que j'ai appris

- Me servir du module `readline` pour créer une interface utilisateur en ligne de commande.
- Implémenter une logique de contrôle de flux en asynchrone avec des fonctions imbriquées.
- Mieux structurer un petit projet Node.js avec gestion d'erreurs.
---

Pour exécuter le programme :

installer les dépendances

```bash
npm i
```
lancer le programme :

```bash
node index.js
```

2. **Choisir une opération** :

   Une fois lancé, le programme affiche un menu :

   ```
   + Addition
   - Soustraction
   * Multiplication
   / Division
   5 Quitter
   ```

   Par exemple, tapez `+` pour additionner deux nombres, puis appuyez sur Entrée.

3. **Entrer les nombres** :

   Le programme vous demandera ensuite d’entrer deux nombres :

   ```
   Entrez le premier nombre : 10
   Entrez le deuxième nombre : 5
   ```

4. **Résultat** :

   Il affichera ensuite le résultat :

   ```
   Résultat : 15
   ```

5. **Retour au menu** :

   Après chaque opération, le menu est à nouveau affiché pour que vous puissiez en faire une autre ou quitter en tapant `5`.

6. **Exemple d’erreur** :

   * Si vous tapez un mot à la place d’un nombre :

     ```
     Entrez le premier nombre : abc
     Erreur : Entrée invalide : ce n'est pas un nombre.
     ```

     Le programme vous redemandera une saisie correcte.

   * Si vous tentez une division par zéro :

     ```
     Entrez le deuxième nombre : 0
     Erreur : La division par zéro n'est pas permise.
     ```