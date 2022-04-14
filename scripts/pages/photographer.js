

// Cette fonction me permet de récupérer dans le DOM la classe de la division 
// ".photograph-header". La suite m'indique que pour chaque photographe pris dans le tableau,
// on crée deux constantes associées à des fonctions. Ces deux fonctions (la deuxième imbriquée
// dans la première), permettent l'affichage de nouveaux éléments HTML lors de l'exécution du code.
// (Voir commentaires sur les factories de photographers.js).La dernière ligne de cette fonction place 
// la constante userBanner comme enfant de la constante photographersBanner. En bref, cette fonction 
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
// des photographes, je récupère leurs photos. Petite différence, je dois créer de toutes pièces
// la gallery_section en récupérant dans le DOM la balise main puis en affiliant comme enfant de cette 
// balise, la gallery-section .

function displayData2(media) {

    // data ou photographers ne fonctionne pas en deuxième paramètre. Impossible de faire un DPF 
    // pour l'instant.
    // const { price } = photographers;

    const photoSection0 = document.getElementById("main");
    const userSection0 = document.createElement("section");
    const likesPopup = document.createElement("div");
    // const priceRecall = document.createElement("span");
    photoSection0.appendChild(userSection0);
    userSection0.classList.add("gallery_section");
    const photoSection = document.querySelector(".gallery_section");
    media.forEach((photo) => {
        const photoSection2 = galleryFactory(photo);
        const userPictures = photoSection2.getUserPictures();
        photoSection.appendChild(userPictures);
    });
    userSection0.appendChild(likesPopup);
    likesPopup.setAttribute("id", "likes_popup");
    likesPopup.classList.add("likes_popup");

};

function displayData3(photographers) {
    const likesPopup = document.getElementById("likes_popup");
    console.log(likesPopup);

    photographers.forEach((photographer) => {
        const likesPopup2 = priceFactory(photographer);
        const userPrice = likesPopup2.getUserPrice();
        likesPopup.appendChild(userPrice);
    });
};

// function displayData4() {
//     const likesPopup = document.getElementById("likes_popup");
//     const displayTotalOfLikes = document.createElement("span");
//     likesPopup.appendChild(displayTotalOfLikes);

// }


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
            // passé en paramètre à partir du tableau "photographers". Je stocke tout cela dans la constante 
            // selectedPhotographe que j'obtiens dans le return pour m'en servir par la suite.
            // C'est le return qui va faire en sorte que ma fonction init sélectionne le bon photographe.

            const photographers = res2.photographers;
            const selectedPhotographe = photographers.find((elem) => {
                return elem.id === photographerId;
            });

            return selectedPhotographe;

        }

        function getPhotos(photosId) {

            // Ici j'ai donné à ma constante photos, le résultat de la requête fetch. Le 
            // .media me permet de cibler spécifiquement le tableau dont j'ai besoin dans le 
            // document json.
            // Je reprends ensuite l'url actuelle avec l'id que j'ai utilisé pour obtenir la bannière
            // dans le 1er fetch. Je stocke cette id dans photographerId2. Je ré-utilise mon tableau 
            // de photos (const photos), pour y appliquer la méthode filter. Le paramètre (elem) me 
            // permet d'étudier chaque objet un par un pour y appliquer le filtre. Le filtre s'exprime 
            // dans le if : les photos doivent avoir la même id (elem.photographer.id ou photosId) que l'id
            // de la page actuelle (PhotographerId2). L'ensemble du filtre est contenu dans selectedPhotos
            // qui vient comme valeur de retour à la fin de la fonction.

            const photos = res2.media;
            const url = new URL(window.location);
            const params = new URLSearchParams(url.search);
            const photographerId2 = Number(params.get("id"));
            const selectedPhotos = photos.filter((elem) => {
                if (photosId === photographerId2) {
                    return elem.photographerId === photosId;
                }
            });

            return selectedPhotos;

        }

        function getPhotographer2(photographerId) {

            // Ici j'ai donné à ma constante photographers, le résultat de la requête fetch. Le
            // .photographers me permet de cibler spécifiquement le tableau dont j'ai besoin dans le
            // document json.
            // J'associe ensuite photographerId au résultat de ma méthode find qui vise l'id de l'élément
            // passé en paramètre à partir du tableau "photographers". Je stocke tout cela dans la constante
            // selectedPhotographe que j'obtiens dans le return pour m'en servir par la suite.
            // C'est le return qui va faire en sorte que ma fonction init sélectionne le bon photographe.

            const photographers = res2.photographers;
            const selectedPhotographe = photographers.find((elem) => {
                return elem.id === photographerId;
            });

            return selectedPhotographe;

        }

        // function getLikes(photosId) {



        //     const photos = res2.media;
        //     const url = new URL(window.location);
        //     const params = new URLSearchParams(url.search);
        //     const photographerId2 = Number(params.get("id"));
        //     const selectedPhotos = photos.filter((elem) => {
        //         if (photosId === photographerId2) {
        //             return elem.photographerId === photosId;
        //         }
        //     });
        //     const displayTotalOfLikes = document.createElement("span");
        //     const likesPopup = document.getElementById("likes_popup");
        //     let totalOfLikes = 0;
        //     for (let i = 0; i < selectedPhotos.length; i++) {
        //         totalOfLikes += selectedPhotos[i].likes
        //     }
        //     console.log(totalOfLikes);
        //     displayTotalOfLikes.innerText = totalOfLikes;
        //     // likesPopup.appendChild(displayTotalOfLikes); 

        //     // C'est cette ligne qui est problématique, mais pourquoi !!??


        // return displayTotalOfLikes;




        // function increaseLikes1 {
        //     const likingButton = document.querySelector(".liking_button");
        //     likingButton.addEventListener("click", () => {

        //     }
        //      )
        // }

        // }

        async function init() {

            const url = new URL(window.location);
            const params = new URLSearchParams(url.search);
            const photographerId = Number(params.get("id"));

            const photographers = await getPhotographer(photographerId);
            const photos = await getPhotos(photographerId);
            const photographers2 = await getPhotographer2(photographerId);
            // const likes = await getLikes(photographerId);
            // console.log(likes);
            displayData([photographers]);
            displayData2(photos);
            displayData3([photographers2]);
            // displayData4(likes);
        };

        init();

    })
    .catch(function (err) {

    });





