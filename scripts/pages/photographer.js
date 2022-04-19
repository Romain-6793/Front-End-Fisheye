

// Cette fonction me permet de récupérer dans le DOM la classe de la division 
// ".photograph-header". La suite m'indique que pour chaque photographe pris dans le tableau,
// on crée deux constantes associées à des fonctions. Ces deux fonctions (la deuxième imbriquée
// dans la première), permettent l'affichage de nouveaux éléments HTML lors de l'exécution du code.
// (Voir commentaires sur les factories de photographers.js).La dernière ligne de cette fonction place 
// la constante userBanner comme enfant de la constante photographersBanner. En bref, cette fonction 
// est une tradcution des fonctions de notre design pattern factory en constantes.
// Elle lie le DPF à notre code Javascript principal.

let selectedPhotos = [];


function displayBanner(photographers) {
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

function displayGallery(media) {

    const photoSection0 = document.getElementById("main");
    const userSection0 = document.createElement("section");
    const likesPopup = document.createElement("div");
    const divSelect = document.createElement("div");
    const labelSelect = document.createElement("label");
    const menuSelect = document.createElement("select");
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    const option3 = document.createElement("option");
    photoSection0.appendChild(userSection0);
    userSection0.classList.add("gallery_section");
    const photoSection = document.querySelector(".gallery_section");
    photoSection.appendChild(divSelect);
    divSelect.classList.add("div_select");
    divSelect.id = "div_select";
    divSelect.appendChild(labelSelect);
    labelSelect.classList.add("label_select");
    labelSelect.setAttribute("for", "div_select");
    labelSelect.innerText = "Trier par";
    divSelect.appendChild(menuSelect);
    menuSelect.id = "menu_select";
    menuSelect.classList.add("menu_select");
    menuSelect.appendChild(option1);
    option1.classList.add("option");
    option1.setAttribute("value", "popularité");
    option1.innerText = "Popularité";
    menuSelect.appendChild(option2);
    option2.classList.add("option");
    option2.setAttribute("value", "date");
    option2.innerText = "Date";
    menuSelect.appendChild(option3);
    option3.classList.add("option");
    option3.setAttribute("value", "titre");
    option3.innerText = "Titre";
    media.forEach((photo) => {
        const photoSection2 = galleryFactory(photo);
        const userPictures = photoSection2.getUserPictures();
        photoSection.appendChild(userPictures);
    });
    userSection0.appendChild(likesPopup);
    likesPopup.setAttribute("id", "likes_popup");
    likesPopup.classList.add("likes_popup");


};

function clearGallery() {
    const userSection0 = document.querySelector(".gallery_section");
    document.getElementById("main").removeChild(userSection0);
}

function displayLikes(photographers) {
    const likesPopup = document.getElementById("likes_popup");


    photographers.forEach((photographer) => {
        const likesPopup2 = priceFactory(photographer);
        const userPrice = likesPopup2.getUserPrice();
        likesPopup.appendChild(userPrice);
        const totalLikes = getTotaLikes();
        displayTotalLikes(totalLikes);
    });
};

function sortPhotosByPopularity(selectedPhotos) {
    console.log("tableau likes trié", selectedPhotos.sort((a, b) => {
        a = a.likes;
        b = b.likes;
        if (a - b > 0) {
            return -1;
        }
        if (a - b < 0) {
            return 1;
        }
        if (a - b === 0) {
            return 0;
        }
    }));

    clearGallery();

    displayGallery(selectedPhotos.sort((a, b) => {
        a = a.likes;
        b = b.likes;
        if (a - b > 0) {
            return -1;
        }
        if (a - b < 0) {
            return 1;
        }
        if (a - b === 0) {
            return 0;
        }
    }));

    displayLikes(selectedPhotos);

}

function sortPhotosByDate(selectedPhotos) {
    console.log("tableau dates trié", selectedPhotos.sort((a, b) => {
        a = a.date;
        b = b.date;

        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        if (a === b) {
            return a.date - b.date;
        }
    }));

    clearGallery();

    displayGallery(selectedPhotos.sort((a, b) => {
        a = a.date;
        b = b.date;

        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        if (a === b) {
            return a.date - b.date;
        }
    }));

    displayLikes(selectedPhotos);

}

function sortPhotosByTitle(selectedPhotos) {
    console.log("tableau titre trié", selectedPhotos.sort((a, b) => {
        a = a.title;
        b = b.title;

        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        if (a === b) {
            return a.date - b.date;
        }
    }));

    clearGallery();

    displayGallery(selectedPhotos.sort((a, b) => {
        a = a.title;
        b = b.title;

        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        if (a === b) {
            return a.date - b.date;
        }
    }));

    displayLikes(selectedPhotos);

}

function launchSortPhotos() {
    const selectionner = document.getElementById("menu_select");
    selectionner.addEventListener("change", (e) => {

        e.preventDefault();

        if (e.target.value === "popularité") {
            sortPhotosByPopularity(selectedPhotos);
        }
        if (e.target.value === "date") {
            sortPhotosByDate(selectedPhotos);
        }
        if (e.target.value === "titre") {
            sortPhotosByTitle(selectedPhotos);
        }
    })

}



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


            // Je reprends l'url actuelle avec l'id que j'ai utilisé pour obtenir la bannière
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
            selectedPhotos = photos.filter((elem) => {
                if (photosId === photographerId2) {
                    return elem.photographerId === photosId;
                }
            });

            return selectedPhotos;


        }

        function getPhotographer2(photographerId) {


            // J'associe photographerId au résultat de ma méthode find qui vise l'id de l'élément
            // passé en paramètre à partir du tableau "photographers". Je stocke tout cela dans la constante
            // selectedPhotographe que j'obtiens dans le return pour m'en servir par la suite.
            // C'est le return qui va faire en sorte que ma fonction init sélectionne le bon photographe.

            const photographers = res2.photographers;
            const selectedPhotographe = photographers.find((elem) => {
                return elem.id === photographerId;
            });

            return selectedPhotographe;

        }

        async function init() {

            const url = new URL(window.location);
            const params = new URLSearchParams(url.search);
            const photographerId = Number(params.get("id"));

            const photographers = await getPhotographer(photographerId);
            const photos = await getPhotos(photographerId);
            const photographers2 = await getPhotographer2(photographerId);
            displayBanner([photographers]);
            displayGallery(photos);
            displayLikes([photographers2]);
            launchSortPhotos(selectedPhotos);
            // sortPhotosByPopularity(selectedPhotos);
            // sortPhotosByDate(selectedPhotos);
            // sortPhotosByTitle(selectedPhotos);
        };

        init();

    })
    .catch(function (err) {

    });









