let flags = [
    "France",
    "Germany",
    "United_Kingdom",
    "Italy",
    "Spain",
    "Portugal",
    "Poland",
    "Czech_Republic",
    "Japan",
    "Ireland",
    "Canada",
    "Belgium"
]

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
    //Check si pas de doublons
    if(!(new Set(generatedArray).size === generatedArray.length)){

        console.log("passage =")
        console.log(generatedArray);

        randomArray(array,number);
    } else {

        console.log(generatedArray)

        //FIXME return undefined quand recursivité
        return generatedArray;
    }
}

console.log(randomArray(flags,4));