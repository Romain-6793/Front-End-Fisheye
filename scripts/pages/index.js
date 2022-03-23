

// J'ai englobé le code existant dans le fetch car j'avais besoin d'aller chercher les infos dans le json.
// Le 2ème then ayant pour paramètre res2, englobe l'essentiel du code. Ce then apparaît après le premier,
// valeur de retour de la promise : res.json. Un catch est également posé à la fin en cas d'erreur.

fetch("../data/photographers.json")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }
    )
    .then(function (res2) {

        // Cette fonction est la fontion de récupération des données des photographes, elle englobe les données 
        // des photographes ainsi que le tableau de ces données qui est retourné.

        async function getPhotographers() {

            // Ici j'ai remplacé ma constante photographers, par le résultat de la requête fetch. Le 
            // .photographers me permet de cibler spécifiquement le tableau dont j'ai besoin dans le 
            // document json.

            const photographers = res2.photographers;

            // la valeur de la fonction return est le tableau des photographes que nous avons obtenu
            // par fetch.  

            // J'ai besoin de précisions sur la notation.

            return ({
                photographers: [...photographers]
            })
        }

        // Cette fonction asynchrone me permet de récupérer dans le DOM la classe de la division 
        // ".photographer_section". La suite m'indique que pour chaque photographe pris dans le tableau,
        // on crée deux constantes associées à des fonctions. Ces deux fonctions (la deuxième imbriquée
        // dans la première), permettent l'affichage de nouveaux éléments HTML lors de l'exécution du code.
        // (Voir commentaires sur les factories de photographers.js).La dernière ligne de cette fonction place 
        // la constante userCardDOM comme enfant de la constante photographersSection. En bref, cette fonction 
        // est une tradcution des fonctions de notre design pattern factory en constantes.
        // Elle lie le DPF à notre code Javascript principal.

        // Pourquoi il n'y a pas d'await ?

        async function displayData(photographers) {
            const photographersSection = document.querySelector(".photographer_section");

            photographers.forEach((photographer) => {
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                photographersSection.appendChild(userCardDOM);
            });
        };

        // Cette fonction asynchrone récupère les data des photographes, puis attend (await) que toutes les 
        // données du json soient obtenues avant de lancer la fonction displayData, prenant en 
        // paramètre la variable photographers (tableaux de photographes du json). 
        // Plus bas , la fonction init() est appelée, permettant l'enchainement de toutes les autres 
        // fonctions.


        // Pourquoi la constante est sous cette forme, sachant qu'il n'y a qu'une propriété ?

        async function init() {
            const { photographers } = await getPhotographers();
            displayData(photographers);
        };

        init();

    })
    .catch(function (err) {

    });










// à remettre sous getPhotographers !!! Voir si je peux l'enlever.
    // Cette constante est un tableau dans lequel toutes les données des photographes sont rassemblées
    // pour être affichées sur la page d'accueil, elles ne sont pas encore récupérées dans le json.

    // const photographers = [
    //     {
    //         "name": "Premier data test",
    //         "id": 1,
    //         "city": "Paris",
    //         "country": "France",
    //         "tagline": "Ceci est ma data test",
    //         "price": 400,
    //         "portrait": "account.png"
    //     },
    //     {
    //         "name": "Deuxième data test",
    //         "id": 2,
    //         "city": "Londres",
    //         "country": "UK",
    //         "tagline": "Ceci est ma data test 2",
    //         "price": 500,
    //         "portrait": "account.png"
    //     },
    //     {
    //         "name": "Troisième data test",
    //         "id": 2,
    //         "city": "New York",
    //         "country": "USA",
    //         "tagline": "Ceci est ma data test 3",
    //         "price": 500,
    //         "portrait": "account.png"
    //     },
    //     {
    //         "name": "Quatrième data test",
    //         "id": 2,
    //         "city": "Barcelona",
    //         "country": "Espagne",
    //         "tagline": "Ceci est ma data test 4",
    //         "price": 500,
    //         "portrait": "account.png"
    //     },
    //     {
    //         "name": "Cinquième data test",
    //         "id": 2,
    //         "city": "Berlin",
    //         "country": "Allemagne",
    //         "tagline": "Ceci est ma data test 5",
    //         "price": 500,
    //         "portrait": "account.png"
    //     },
    //     {
    //         "name": "Sixième data test",
    //         "id": 2,
    //         "city": "Ljubljana",
    //         "country": "Slovenia",
    //         "tagline": "Ceci est ma data test 6",
    //         "price": 500,
    //         "portrait": "account.png"
    //     },
    // ]