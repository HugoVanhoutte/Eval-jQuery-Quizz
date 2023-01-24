let flags = [
    "FR",
    "DE",
    "UK",
    "IT",
    "ES",
    "US",
    "PO",
    "PL",
    "CZ",
    "JP",
    "IR",
    "CA",
    "BE",
]

let guesses = [
    "France",
    "Allemagne",
    "Royaume-Uni",
    "Italie",
    "Espagne",
    "Portugal",
    "Pologne",
    "République Tchèque",
    "Japon",
    "Irelande",
    "Canada",
    "Belgique"
]

function generate(){
    //Choisir un drapeau au hasard
    //Choisir 4 questions differentes au hasard
    let randomNumber = Math.floor(Math.random()*flags.length)
    return flags[randomNumber];
}



let startGame = () => {
  //Lance un compte a rebours de 10 secondes
  //Genere un premoier drapeau et un premier set de 4 choix

    let game = setTimeout(generate(), 10000);
    let questions = [];
    let generateQuestions = () => {
        for (let i = 0; i < 4; i++) {
            questions.push(guesses[Math.floor(Math.random() * guesses.length)])
        }
        let questionsSet = new Set(questions);
        console.log(generateQuestions())
        if (questionsSet.length !== 4) {
            generateQuestions()
        } else {
            return questionsSet
        }
    }

    //met fin au timer
    //clearTimeout(game);
    //Affiche score

    //Clear Le reste
}

startGame()

function guess(){
    //Check si la reponse selsctionnée est la bonne
    //Incremente ou non le score en fonction
    //Genere un autre drapeau et un autre set de 4 choix
}