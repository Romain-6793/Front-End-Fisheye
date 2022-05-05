
import { bannerFactory, galleryFactory, priceFactory, displayTotalLikes, getTotaLikes, lightBoxFactory } from "../factories/factories.js"
import { createCarousel } from "../utils/lightbox.js"


let selectedPhotos = [];


// Cette fonction me permet de récupérer dans le DOM la classe de la division 
// ".photograph-header". La suite m'indique que pour chaque photographe 
// (sélectionné dans le tableau => fonction init),
// on crée deux constantes associées à des fonctions. Ces deux fonctions (la deuxième imbriquée
// dans la première), permettent l'affichage de nouveaux éléments HTML lors de l'exécution du code.
// (Voir bannerFactory dans factories.js).La dernière ligne de cette fonction place 
// la constante userBanner comme enfant de la constante photographersBanner. En bref, cette fonction 
// est une tradcution des fonctions de notre design pattern factory en constantes.
// Elle lie le DPF à notre code Javascript principal.



function displayBanner(photographers) {
    const photographersBanner = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographersBanner2 = bannerFactory(photographer);
        const userBanner = photographersBanner2.getUserBanner();
        photographersBanner.appendChild(userBanner);
    });
}

// Cette fonction est la même que pour la précédente, mais au lieu de récupérer les informations 
// des photographes, je récupère leurs photos. Petite différence, je dois créer de toutes pièces
// la gallery_section en récupérant dans le DOM la balise main puis en affiliant comme enfant de cette 
// balise, la gallery-section .

function displayGallery(media) {

    const photoSection0 = document.getElementById("main");
    const userSection0 = document.createElement("section");
    photoSection0.appendChild(userSection0);
    userSection0.classList.add("gallery_section");
    const photoSection = document.querySelector(".gallery_section");
    media.forEach((photo) => {
        const photoSection2 = galleryFactory(photo);
        const userPictures = photoSection2.getUserPictures();
        photoSection.appendChild(userPictures);
    });



}

// Cette fonction permet de supprimer la gallerie lorsqu'un tri s'effectue, avant d'en afficher une nouvelle
// correspondant au tri effectué.

function clearGallery() {
    const userSection0 = document.querySelector(".gallery_section");
    document.getElementById("main").removeChild(userSection0);
}

// Cette fonction permet de supprimer la lightbox lorsque je choisis de la fermer
// , avant d'en afficher une nouvelle lorsque je clique sur un lien photo. 

function clearLightBox() {
    const LightBoxFlex = document.getElementById("lightbox_flex");
    document.getElementById("lightbox_modal").removeChild(LightBoxFlex);
}


function displayLightBox() {

    // Ici , pas besoin de mettre selectedPhotos en paramètres, au contraire, cela va modifier la référence
    // et selectedPhotos ne sera plus le tableau dont j'ai besoin.

    const lightBox = document.getElementById("lightbox_modal");
    lightBox.style.display = "block";
    const likesPopup = document.getElementById("likes_popup");
    likesPopup.style.display = "none";
    const lightBoxFlex = document.createElement("div");
    lightBoxFlex.setAttribute("id", "lightbox_flex");
    const carouselBox = document.createElement("div");
    carouselBox.setAttribute("id", "carousel_box");
    const carouselPrev = document.createElement("div");
    carouselPrev.setAttribute("class", "carousel__prev");
    const carouselNext = document.createElement("div");
    carouselNext.setAttribute("class", "carousel__next");
    const closeLightbox = document.createElement("div");
    closeLightbox.setAttribute("class", "close_lightbox");
    const carouselWindow = document.createElement("div");
    carouselWindow.setAttribute("class", "carousel_window");


    lightBox.appendChild(lightBoxFlex);
    lightBoxFlex.appendChild(carouselBox);
    carouselBox.appendChild(carouselPrev);
    carouselBox.appendChild(carouselNext);
    carouselBox.appendChild(closeLightbox);
    carouselBox.appendChild(carouselWindow);




    selectedPhotos.forEach((photo) => {
        const lightBox2 = lightBoxFactory(photo);
        const userLightBox = lightBox2.getUserLightBox();
        // console.log(userLightBox);
        carouselWindow.appendChild(userLightBox);
    });

    createCarousel();

    // ===================================================================================
    // Trouver un moyen de dissocier ce code...

    const closeLightboxBtn = document.querySelectorAll(".close_lightbox");

    closeLightboxBtn.forEach((btn) => btn.addEventListener("click", closeLightBox))

    function closeLightBox() {

        lightBox.style.display = "none";
        const likesPopup = document.getElementById("likes_popup");
        likesPopup.style.display = "block";

        clearLightBox();

    }

    // ======================================================================================

}






// Les deux fonctions qui suivent permettent d'afficher respectivement le nombre total de likes et le prix
// journalier du photographe dans la popup de bas de page (cf factories : getTotaLikes, displayTotalLikes
//     ,priceFactory).

function displayLikes(photographers) {

    photographers.forEach((photographer) => {
        const totalLikes = getTotaLikes(photographer);
        displayTotalLikes(totalLikes);
    });
}

function displayPrice(photographers) {

    photographers.forEach((photographer) => {
        const price2 = priceFactory(photographer);
        price2.getUserPrice();

    });
}

// Les trois fonctions qui suivent me permettent de trier par popularité, date ou titre les photos qui
// vont s'afficher (elles mêmes étant des composants de la variable-tableau selectedPhotos).

function sortByPopularity(selectedPhotos) {
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

}

function sortByDate(selectedPhotos) {
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

}

function sortByTitle(selectedPhotos) {
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


}

// La macro-focntion qui suit me permet d'ajouter un event-Listener change à chaque item du menu déroulant,
// déclenchant ainsi la fonction de tri appropriée selon la valeur sélectionnée.

function launchSortPhotos() {
    const selectionner = document.getElementById("menu_select");
    selectionner.addEventListener("change", (e) => {

        e.preventDefault();

        if (e.target.value === "popularité") {
            sortByPopularity(selectedPhotos);
        }
        if (e.target.value === "date") {
            sortByDate(selectedPhotos);
        }
        if (e.target.value === "titre") {
            sortByTitle(selectedPhotos);
        }
    })

}

function photoListener() {

    // Ici , pas besoin de passer de paramètre puisque le contenu de ma fonction est indépendant.

    const photoLink = document.querySelectorAll(".photo_link");
    console.log(photoLink);
    photoLink.forEach((a) => a.addEventListener("click", displayLightBox))

    // photoLink.forEach((a) => a.addEventListener("click", (e) => {
    //     e.preventDefault()
    //     displayLightBox()
    // }))

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
            // Je déclare ensuite une constante nommée selectedPhotographe. C'est en fait la méthode find,
            // appliquée à photographers, dont le résultat est l'id du photographe sélectionné. Ce résultat
            // est en fait associé à selectedPhotographe.
            // C'est le return qui va faire en sorte que ma fonction init sélectionne le bon photographe.

            const photographers = res2.photographers;
            const selectedPhotographe = photographers.find((e) => {
                return e.id === photographerId;
            });

            return selectedPhotographe;

        }

        function getPhotos(photosId) {


            // Ici je stocke le tableau des photos dans la constante photos. Ensuite je récupère l'url
            // actuelle via window.location (DOM), en créant une instance de l'objet URL. Je crée ensuite 
            // une nouvelle instance des URLSearchParams (avec url.search en argument). Cela me permet 
            // d'analyser des éléments de l'url actuelle dont l'id.
            // Je stocke cette id dans photographerId2. Je ré-utilise mon tableau 
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
                //TODO: photographId2 et elem.photographerId sont ils identiques ?
                if (photosId === photographerId2) {
                    return elem.photographerId === photosId;
                }
            });

            return selectedPhotos;


        }

        // Cette fonction est la fonction init, elle appelle toutes les autres fonctions en prenant en compte 
        // l'url actuelle et ses usp, pour renvoyer le bon photographe et les bonnes photos en fonction de l'id.
        // Cette fonction gère donc l'affichage de la bannière du photographe, de ses photos, de la popup de pied,
        // des fonctions de tri . Cette fonction n'a besoin d'être appelée qu'une seule fois.

        async function init() {

            const url = new URL(window.location);
            const params = new URLSearchParams(url.search);
            const photographerId = Number(params.get("id"));
            const photographers = await getPhotographer(photographerId);
            const photos = await getPhotos(photographerId);
            displayBanner([photographers]);
            displayGallery(photos);
            displayLikes([photographers]);
            displayPrice([photographers]);
            launchSortPhotos(selectedPhotos);
            photoListener(selectedPhotos);
        }

        init();

    })
    .catch(function (err) {
        console.log(err)

    });

