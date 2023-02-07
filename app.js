
//Recupération du bouton permettant de commencer la partie
const startButton = $('#startButton');

//Recuperation des divs contenant les 4 questions
const answer1 = $('#answer1');
const answer2 = $('#answer2');
const answer3 = $('#answer3');
const answer4 = $('#answer4');
const allAnswers = $('.answer');

//Recuperation de l'image
const image = $('#flag img');

//Recuperation du score
let scoreDisplay = $('#score');

//Recuperation du compteur
let counterDisplay = $('#counter');

//Recuperation de l'historique
let history = $('#historyDiv');
let historyList = $('#history');
let historyFinalScore = $('#scoreFinal');

//creation variable score
let score = 0;

//Creation variable compteur
let counter = 1;

//Déclaration de la variable réponse utilisateur
let userAnswer;

//fonction de generation de chiffre aleatoire entre o et max
let randomNumber = (max) => {
    return Math.floor(Math.random()*max);
}
//fonction de generation d'un array composé de number entrées
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
        //Fonction prototype Permettant de set les questions aléatoirement et de choisir la bonne réponse
        Questions.prototype.setQuestions = function() {
            let questions = randomArray(keys,4);
            this.q1 = response[questions[0]];
            this.q2 = response[questions[1]];
            this.q3 = response[questions[2]];
            this.q4 = response[questions[3]];

            this.a = questions[randomNumber(questions.length)];

            if (this.q1 === this.q2 || this.q1 === this.q3 || this.q1 === this.q4
                || this.q2 === this.q3 || this.q2 === this.q4
                || this.q3 === this.q4){
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

            //Supression de l'ecouteur precedent
            allAnswers.off('click');

            //Recup click et verification resultat
            allAnswers.click(function () {
                userAnswer = $(this).val();
                /*
                if($(this).val() === response[game.a]){
                    //Si bonne réponse
                    if(counter < 10){
                        //si compteur pas fini, on incremente le score et on met le texte a jour
                        score++;
                        scoreDisplay.text(`Score: ${score}/10`);
                    } else {
                        //Compteur fini, on incremente pas le score
                    }
                } else {
                    //Si mauvaise réponse, rien
                }
                //Relance une nouvelle question si compteur < 10
                if(counter < 10){
                    //Mettre la réponse donnée dans une variable
                    userAnswer = $(this).val();
                    historyList.append(`<li>Votre réponse: ${userAnswer}<br>Bonne réponse: ${response[game.a]}<hr></li>`);
                    newGame();
                } else {
                    scoreDisplay.text(`Score: ${score}/10`);
                }*/
                //Verification Compteur
                if (counter < 10) {
                    //Compteur inferieur ou egal a 10
                    //Mise a jour de l'historique
                    counter ++;
                    historyList.append(`<li>Votre réponse: ${userAnswer}<br>Bonne réponse: ${response[game.a]}<hr></li>`);
                    newGame();
                } else {
                    //Compteur superieur a 10
                    //Fermer ecouteur d'evenement
                    allAnswers.off('click');
                }

                //Vérification reponse
                if (userAnswer === response[game.a]){
                    //Bonne réponse
                    score++;
                } else {
                    //Mauvaise réponse
                }
                //Dans tout les cas:
                //mise a jour de l'affichage du score
                scoreDisplay.text(`Score: ${score}/10`);
            })
        }
//event Listener de début de partie
        startButton.click(function (){
            //Reset Score
            score = 0;
            scoreDisplay.text(`Score: ${score}/10`);
            //reset compteur
            counter = 0;
            counterDisplay.text(`Question: ${counter}/10`);
            //Clear Historique
            historyList.html('');
            //lance une nouvelle question
            newGame()
        });
    })

    .fail(function () {
        console.log(Error);
    })