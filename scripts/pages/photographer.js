//Mettre le code JavaScript lié à la page photographer.html

// J'ai englobé le code existant dans le fetch car j'avais besoin d'aller chercher les infos dans le json.
// Le 2ème then ayant pour paramètre res2, englobe l'essentiel du code. Ce then apparaît après le premier,
// valeur de retour de la promise : res.json. Un catch est également posé à la fin en cas d'erreur.

// Cette fonction me permet de récupérer dans le DOM la classe de la division 
// ".photograph-header". La suite m'indique que pour chaque photographe pris dans le tableau,
// on crée deux constantes associées à des fonctions. Ces deux fonctions (la deuxième imbriquée
// dans la première), permettent l'affichage de nouveaux éléments HTML lors de l'exécution du code.
// (Voir commentaires sur les factories de photographers.js).La dernière ligne de cette fonction place 
// la constante userCardDOM comme enfant de la constante photographersSection. En bref, cette fonction 
// est une tradcution des fonctions de notre design pattern factory en constantes.
// Elle lie le DPF à notre code Javascript principal.

function displayData(photographers) {
    const photographersBanner = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographersBanner2 = bannerFactory(photographer);
        const userBanner = photographersBanner2.getUserBanner();
        photographersBanner.appendChild(userBanner);
    });
};

// Cette fonction est la même que pour la précédente, mais au lieu de récupérer les informations 
// des photographes, je récupère leurs photos.

function displayData2(media) {
    const photoSection0 = document.getElementById("main");
    const userSection0 = document.createElement("section");
    photoSection0.appendChild(userSection0);
    userSection0.classList.add("gallery_section");
    const photoSection = document.querySelector(".gallery_section");
    media.forEach((photo) => {
        const photoSection2 = galleryFactory(photo);
        const userGallery = photoSection2.getUserGallery();
        photoSection.appendChild(userGallery)
    });
};

// function displayData(photographers) {
//     const photographersSection = document.querySelector(".photographer_section");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerFactory(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM();
//         photographersSection.appendChild(userCardDOM);
//     });
// };


// Ici je fais un premier fetch pour récupérer le header de chaque photographe. 

fetch("../data/photographers.json")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }
    )
    .then(function (res2) {

        function getPhotographer(photographerId) {

            // Ici j'ai donné à ma constante photographers, le résultat de la requête fetch. Le 
            // .photographers me permet de cibler spécifiquement le tableau dont j'ai besoin dans le 
            // document json.
            // J'associe ensuite photographerId au résultat de ma méthode find qui vise l'id de l'élément 
            // passé en paramètre. Je stocke tout cela dans la constante selectedPhotographe.


            const photographers = res2.photographers;
            const selectedPhotographe = photographers.find((elem) => {
                return elem.id === photographerId
            });

            return selectedPhotographe;

        }

        // Dans la fonction init() ci-dessous, j'ai crée la constante "url" qui est une nouvelle instance
        // de l'objet "URL", cette instance a pour paramètre "window.location". Window est un "super-objet"
        // du DOM. Location est une de ses propriétés qui me permet de récupérer les infos de l'url
        // actuelle.
        // 2ème étape, je stocke une instance de URLSearchParams dans "params" avec url.search comme 
        // paramètres. Ce qui va me permettre, toujours dans location, d'accéder à "search". 
        // 3ème étape, je stocke dans photographerId, depuis params, l'id que j'ai récupérée depuis la 
        // méthode "get". Je n'oublie pas d'englober le tout dans la méthode Number() qui va me renvoyer
        // une valeur non sous forme de string mais de nombre.

        // Cette fonction asynchrone récupère les data des photographes, puis attend (await) que toutes les 
        // données du json soient obtenues avant de lancer la fonction displayData, prenant en 
        // paramètre la variable photographers (tableaux de photographes du json). 
        // Plus bas , la fonction init() est appelée, permettant l'enchainement de toutes les autres 
        // fonctions.

        async function init() {

            const url = new URL(window.location);
            const params = new URLSearchParams(url.search);
            const photographerId = Number(params.get("id"));

            const photographers = await getPhotographer(photographerId);
            displayData([photographers]);
        };

        init();

    })
    .catch(function (err) {

    });

// Dans ce second fetch, je récupère la galerie de photos de chaque photographe .

fetch("../data/photographers.json")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }
    )
    .then(function (res3) {

        // function getPhotos(idPhotos) {

        //     // Ici j'ai donné à ma constante photographers, le résultat de la requête fetch. Le 
        //     // .photographers me permet de cibler spécifiquement le tableau dont j'ai besoin dans le 
        //     // document json.
        //     // J'associe ensuite photographerId au résultat de ma méthode find qui vise l'id de l'élément 
        //     // passé en paramètre. Je stocke tout cela dans la constante selectedPhotographe.


        //     const photos = res3.media;
        //     const selectedPhotos = photos.filter((elem) => {
        //         return elem.id === idPhotos;
        //     });

        //     return selectedPhotos;

        // }

        // Comme dans le script index, j'ai pris la propriété "media" de mon objet json que j'ai assigné 
        // à mon paramètre res3 de mon 2ème then sous forme de constante . Résultat : je peux passer media 
        // en paramètre de displayData2.

        function init() {
            const { media } = res3;
            displayData2(media);
        };

        init();
    })
    .catch(function (err) {

    });


