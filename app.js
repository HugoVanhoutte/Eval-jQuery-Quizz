let url = "https://flagcdn.com/fr/codes.json"
//
//Recupération du bouton permettant de commencer la partie
const startButton = $('#startButton');

//Recuperation des divs contenant les 4 questions
const answer1 = $('#answer1');
const answer2 = $('#answer2');
const answer3 = $('#answer3');
const answer4 = $('#answer4');
const allAnswers = $('.answer');

//Recuperation de l'image
const image = $('#question img');

//Recuperation du score
let scoreDisplay = $('#score');

//creation variable score
let score = 0;

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



$.ajax({
    url: url,
    method: "GET",
    dataType: "json"
})
    .done(function (response) {
        let keys = Object.keys(response);
        let values = response[keys];
        //Fonction prototype Permettant de set les questions aléatoirement et de choisir la bonne réponse
        Questions.prototype.setQuestions = function() {
            let questions = randomArray(keys,4);
            this.q1 = response[questions[0]]
            this.q2 = response[questions[1]];
            this.q3 = response[questions[2]];
            this.q4 = response[questions[3]];

            this.a = questions[randomNumber(questions.length)];
            console.log(this.a)

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
                if($(this).val() === game.a){
                    //Si bonne réponse:
                    score++;
                    scoreDisplay.text(`Score : ${score}`);
                } else {
                    //TODO Afficher bonne réponse
                }
                //Relance une nouvelle question
                newGame();
                //TODO affichage historique des réponses
            })
        }
//event Listener de début de partie
        startButton.click(function (){
            //Reset Score
            score = 0;
            scoreDisplay.text(`Score : ${score}`)
            //TODO reset timer
            //lance une nouvelle question
            newGame()
        });
    })

    .fail(function () {
        console.log(Error);
    })


/*
//Recupération du bouton permettant de commencer la partie
const startButton = $('#startButton');

//Recuperation des divs contenant les 4 questions
const answer1 = $('#answer1');
const answer2 = $('#answer2');
const answer3 = $('#answer3');
const answer4 = $('#answer4');
const allAnswers = $('.answer');

//Recuperation de l'image
const image = $('#question img');

//Recuperation du score
let scoreDisplay = $('#score');

//creation variable score
let score = 0;


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

//Fonction prototype Permettant de set les questions aléatoirement et de choisir la bonne réponse
Questions.prototype.setQuestions = function() {
    let questions = randomArray(flags,4);
    this.q1 = questions[0];
    this.q2 = questions[1];
    this.q3 = questions[2];
    this.q4 = questions[3];

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
    answer1.val(game.q1.replace("_"," "));
    answer2.val(game.q2.replace("_"," "));
    answer3.val(game.q3.replace("_"," "));
    answer4.val(game.q4.replace("_"," "));

    //Mise du drapeau dans l'image
    image.attr('src', `/flags/${game.a}.svg`);

    //Supression de l'ecouteur precedent
    allAnswers.off('click');

    //Recup click et verification resultat
    allAnswers.click(function () {
        if($(this).val() === game.a){
            //Si bonne réponse:
            score++;
            scoreDisplay.text(`Score : ${score}`);
        } else {
            //TODO Afficher bonne réponse
        }
        //Relance une nouvelle question
        newGame();
        //TODO affichage historique des réponses
    })
}
//event Listener de début de partie
startButton.click(function (){
    //Reset Score
    score = 0;
    scoreDisplay.text(`Score : ${score}`)
    //TODO reset timer
    //lance une nouvelle question
    newGame()
});

 */