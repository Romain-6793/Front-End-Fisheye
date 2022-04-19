// Cette fonction me permet de récupérer dans le DOM la classe de la division 
// ".photographer_section". La suite m'indique que pour chaque photographe pris dans le tableau,
// on crée deux constantes associées à des fonctions. Ces deux fonctions (la deuxième imbriquée
// dans la première), permettent l'affichage de nouveaux éléments HTML lors de l'exécution du code.
// (Voir commentaires sur les factories de photographers.js).La dernière ligne de cette fonction place 
// la constante userCardDOM comme enfant de la constante photographersSection. En bref, cette fonction 
// est une tradcution des fonctions de notre design pattern factory en constantes.
// Elle lie le DPF à notre code Javascript principal.

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// J'ai englobé le code existant dans le fetch car j'avais besoin d'aller chercher les infos dans le json.
// Le 2ème then ayant pour paramètre res2, englobe la fonction init, point de départ de toutes les autres.
// Ce then apparaît après le premier, valeur de retour de la promise : res.json. Un catch est également 
// posé à la fin en cas d'erreur.

fetch("../data/photographers.json")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }
    )
    .then(function (res2) {

        // Au lieu d'appeler la fonction getphotographers comme c'était le cas au début. J'ai pris la propriété
        // photographers de mon objet json que j'ai assigné à mon paramètre res2 de mon 2ème then sous forme
        // de constante . Résultat : je peux passer photographers en paramètre de displayData.

        function init() {
            const { photographers } = res2;
            displayData(photographers);
        };

        init();

    })
    .catch(function (err) {

    });











