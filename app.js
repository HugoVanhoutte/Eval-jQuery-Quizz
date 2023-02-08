//Recupération du bouton permettant de commencer la partie
const startButton = $('#startButton');

//Recuperation des divs contenant les 4 questions
const answer1 = $('#answer1');
const answer2 = $('#answer2');
const answer3 = $('#answer3');
const answer4 = $('#answer4');
const allAnswers = $('.answer');

//Récupération de l'image
const image = $('img');

//Recuperation du score depuis le DOM
const scoreDisplay = $('#scoreNum');

//Récupération du compteur depuis le DOM
const counterDisplay = $('#counterNum');

//History List
const historyList = $('#historyList');


//création de la variable score
let score = 0;

//Création de la variable compteur
let counter = 0;


//Fonction de génération de chiffre aléatoire entre o et "max"
let randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}
//Fonction de generation d'un tableau composé de "number" entrées
let randomArray = (array, number) => {
    let generatedArray = [];
    for (let i = 0; i < number; i++) {
        generatedArray.push(array[randomNumber(array.length)]);
    }
    return generatedArray;
}


//Objet contenant les 4 questions
function Questions() {
    this.q1 = "";
    this.q2 = "";
    this.q3 = "";
    this.q4 = "";

    this.a = "";
}


$.getJSON({
    url: "https://flagcdn.com/fr/codes.json",
})
    .done(function (response) {
        let keys = Object.keys(response);
        //Fonction prototype Permettant de choisir les questions aléatoirement et de choisir la bonne réponse
        Questions.prototype.setQuestions = function () {
            let questions = randomArray(keys, 4);
            this.q1 = response[questions[0]];
            this.q2 = response[questions[1]];
            this.q3 = response[questions[2]];
            this.q4 = response[questions[3]];

            this.a = questions[randomNumber(questions.length)];

            if (this.q1 === this.q2 || this.q1 === this.q3 || this.q1 === this.q4
                || this.q2 === this.q3 || this.q2 === this.q4
                || this.q3 === this.q4) {
                this.setQuestions()
            }
        }

        const game = new Questions();

        //Function pour lancer une nouvelle partie (nouveau set de questions)
        function newGame() {
            if (counter <= 10){
                historyList.append(`<li>${response[game.a]}</li>`);
            }
            console.log(response[game.a]) //TODO REMOVE
            game.setQuestions();
            //Mise des 4 questions dans les divs
            answer1.text(game.q1);
            answer2.text(game.q2);
            answer3.text(game.q3);
            answer4.text(game.q4);

            //Mise du drapeau dans l'image
            image.attr('src', `https://flagcdn.com/${game.a}.svg`);
            //Suppression de l'écouteur precedent
            allAnswers.off('click');
            //Récupération du clic et vérification du résultat
            allAnswers.click(function () { //Good Answer
                if ($(this).text() === response[game.a]){
                    score++;
                } else { //Wrong Answer
                }

                if (counter < 10){ //Counter not finished
                    counter++;
                    counterDisplay.text(counter)
                    newGame();
                }
                else { //Counter Finished
                    allAnswers.off('click');
                }
                //All cases
                scoreDisplay.text(score);
            })
        }

        //Écouteur du bouton "Nouvelle Partie"
        startButton.click(function () {
            //Reinitialisation du score, de l'historique et du compteur
            score = 0;
            scoreDisplay.text(score);

            counter = 1;
            counterDisplay.text(counter);

            historyList.children().html('');

            //lancement d'une nouvelle question
            newGame();
        });
    })
    //En cas d'échec de la requête Ajax
    .fail(function () {
        console.log(Error);
    })