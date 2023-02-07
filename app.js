//Recupération du bouton permettant de commencer la partie
const startButton = $('#startButton');

//Recuperation des divs contenant les 4 questions
const answer1 = $('#answer1');
const answer2 = $('#answer2');
const answer3 = $('#answer3');
const answer4 = $('#answer4');
const allAnswers = $('.answer');

//Récupération de l'image
const image = $('#flag img');

//Recuperation du score
let scoreDisplay = $('#score');

//Recuperation de l'historique
let historyList = $('#history');

//création de la variable score
let score = 0;

//Création de la variable compteur
let counter = 1;
//Récupération du compteur depuis le DOM
let counterDisplay = $('#counter');

//Déclaration du tableau réponses
let answers = [];

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

        //Function pour lancer une nouvelle partie
        function newGame() {
            game.setQuestions();
            //Mise des 4 questions dans les divs
            answer1.val(game.q1);
            answer2.val(game.q2);
            answer3.val(game.q3);
            answer4.val(game.q4);

            //Mise du drapeau dans l'image
            image.attr('src', `https://flagcdn.com/${game.a}.svg`);
            //Suppression de l'écouteur precedent
            allAnswers.off('click');

            //Récupération du clic et vérification du résultat
            allAnswers.click(function () {
                //Verification Compteur
                if (counter < 10) {
                    //Si le compteur est inférieur à 10
                    //Incrementation du compteur et mise à jour
                    counter++;
                    counterDisplay.text(`Question: ${counter}/10`);
                    //Mise à jour de l'historique
                    historyList.append(`<li>Votre réponse: ${userAnswer}<br>Bonne réponse: ${response[game.a]}<hr></li>`);
                    newGame();
                } else {
                    //Sinon si le compteur est supérieur ou égal à 10
                    //Fermer l'écouteur d'évènement
                    allAnswers.off('click');
                    $('#historyDiv').css('display', 'flex')
                }

                //Vérification de la réponse
                if ($(this).val() === response[game.a]) {
                    //Si bonne réponse
                    score++;
                } else {
                    //Mauvaise réponse
                }
                //Dans tous les cas
                //Mise à jour de l'affichage du score
                scoreDisplay.text(`Score: ${score}/10`);
            })
        }

        //Écouteur du bouton "Nouvelle Partie"
        startButton.click(function () {
            //Reinitialisation du score, de l'historique et du compteur
            score = 0;
            scoreDisplay.text(`Score: ${score}/10`);

            historyList.html('');

            counter = 1;
            counterDisplay.text(`Question: ${counter}/10`);

            //lancement d'une nouvelle question
            newGame()
        });
    })
    //En cas d'échec de la requête Ajax
    .fail(function () {
        console.log(Error);
    })