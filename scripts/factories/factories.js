

// Cette fonction (stockée dans la variable totalLikes dans photographers.js) commence par sélectionner 
// tous les h3 contenant le nombre de likes spécifiques à chaque photo. Puis la variable totalOfLikes 
// intervient , elle démarre à 0, puis s'incrémente grâce à une boucle qui s'itère à chaque h3, 
// additionnant ainsi chaque nombre de likes en textContent de chaque h3. La valeur de retour totalOfLikes 
// est ainsi actualisée à la fin.

export function getTotaLikes() {
    let everyLikes = document.querySelectorAll(".number_of_likes");
    let totalOfLikes = 0;
    for (let i = 0; i < everyLikes.length; i++) {
        totalOfLikes += Number(everyLikes[i].textContent);
    }

    return totalOfLikes;
}

// Ici est déclarée la fonction displayTotalLikes qui permet de sélectionner la div likes_popup et 
// d'y mettre comme texte ce qui est passé en paramètre. Cf = la variable totalLikes et getTotalLikes.

export function displayTotalLikes(total) {
    const likesPopup = document.getElementById("likes_popup");
    const likesPosition = document.createElement("div");
    const likesIcon = document.createElement("img");
    const likesDiv = document.createElement("div");
    likesPosition.classList.add("likes_position");
    likesPopup.appendChild(likesPosition);
    const totalLikesSpan = document.createElement("span");
    likesPosition.appendChild(likesDiv);
    likesDiv.appendChild(totalLikesSpan);
    likesDiv.appendChild(likesIcon);
    likesIcon.setAttribute("src", "../assets/icons/heart2.svg");
    likesIcon.setAttribute("alt", "")
    likesDiv.classList.add("likes_div");
    likesIcon.classList.add("likes_icon");
    totalLikesSpan.classList.add("total_likes_span");
    totalLikesSpan.innerText = total;

}



// Cette macro fonction nous permet de récupérer dans le json toutes les propriétés dont nous avons 
// besoin pour créer la présentation de chaque photographe dans la page d'accueil.

export function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    // La constante "picture" nous permet de tracer un chemin vers la propriété "portrait" de l'objet 
    // photographers , cette propriété stockée dans la constante "picture" est ensuite placée comme attribut 
    // src de l'image qui est créee ci-dessous. Image qui servira ensuite d'emplacement, d'abord pour 
    // "account" puis pour les photographes.

    const picture = `assets/photographers/${portrait}`;

    // Cette fonction, déclarée à l'intérieur de photographerFactory, nous permet de créer pour chaque 
    // photographe un article, et une image ainsi qu'un titre h2, elle attribue la constante "picture" à 
    // l'image crée, elle fait en sorte que le contenu du h2 soit le contenu de "name", enfin, elle place 
    // l'image et le h2 comme enfants de l'article et retourne l'article.

    // J'ai pu associer une url aux liens avec le href, puis ajouter un query parameter avec ?
    // Et ajouter id = ${id}, c'est à dire, ma propriété id de l'objet photographers (dans le json).
    // Cela signifie que le lien va nous envoyer vers la page dont l'id correspond au photographe
    // sélectionné.

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo de profil du photographe ${name}`)
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const span = document.createElement('span');
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.setAttribute("tabindex", "0");
        a.setAttribute("aria-label", `lien vers la page du photographe ${name}`)
        h2.textContent = name;
        h3.textContent = `${city}, ${country}`;
        h4.textContent = tagline;
        span.textContent = `${price}€/jour`;
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        a.href = `photographer.html?id=${id}`;
        article.appendChild(p);
        p.appendChild(h3);
        p.appendChild(h4);
        p.appendChild(span);
        return (article);
    }


    // Nous avons comme valeur de retour les constantes name et picture ainsi que la fonction
    // getUserCardDOM, sans parenthèses ?

    return { name, picture, getUserCardDOM }
}


// =====================================================================================================

// Ci-dessous arrivent les factories spécifiques aux pages photographers, le principe est à chaque 
// fois peu ou prou le même que pour photographerFactory.


export function bannerFactory(data) {
    const { name, city, country, tagline, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserBanner() {

        const article = document.createElement('article');
        const img = document.createElement('img');
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo de profil du photographe ${name}`)
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const btn = document.getElementById('contact_button');
        h2.textContent = name;
        h3.textContent = `${city}, ${country}`;
        h4.textContent = tagline;
        article.appendChild(div1);
        article.appendChild(div2);
        article.appendChild(div3);
        div1.appendChild(h2);
        div1.appendChild(h3);
        div1.appendChild(h4);
        div2.appendChild(btn);
        div3.appendChild(img);

        return (article);
    }

    return { name, picture, getUserBanner }
}

// =====================================================================================================

export function galleryFactory(data) {
    let { image, video, title, likes, date } = data;

    const picture = `assets/photographers/${image}`;
    const movie = `assets/photographers/${video}`;

    // la fonction getLikes me permet d'avoir la valeur likes de façon dynamique.

    function getLikes() {
        return likes;
    }

    function getUserPictures() {

        const photoButton = document.createElement('button');
        const article = document.createElement('article');
        photoButton.classList.add("photo_button");
        photoButton.setAttribute("type", "button");
        photoButton.setAttribute("tabindex", "0");
        photoButton.setAttribute("aria-label", "Cliquez pour voir le carousel");
        article.appendChild(photoButton);
        if (video) {
            const video = document.createElement('video');
            photoButton.appendChild(video);
            video.setAttribute("src", movie);
            video.setAttribute("controls", "width 250");
            video.setAttribute("type", "video/mp4");
            video.setAttribute("alt", `${title}`)
            video.setAttribute("aria-label", `${title}`)
            video.setAttribute("tabindex", "0");
        } else {
            const img = document.createElement('img');
            photoButton.appendChild(img);
            img.setAttribute("src", picture);
            img.setAttribute("alt", `${title}`)
            img.setAttribute("aria-label", `${title}`)
            img.setAttribute("tabindex", "0");
        }
        const h3 = document.createElement('h3');
        const h3_2 = document.createElement('h3');
        h3_2.classList.add("number_of_likes");
        const div = document.createElement('div');
        const div2 = document.createElement('div');
        div2.classList.add("likes_and_button");
        const likingButton = document.createElement("button");
        const likingHeart = document.createElement('img');
        likingButton.classList.add("liking_button");
        likingButton.setAttribute("tabindex", "0");
        likingButton.setAttribute("type", "button");
        likingButton.setAttribute("aria-label", "bouton j'aime")
        likingHeart.setAttribute("src", "../assets/icons/heart.svg");
        likingHeart.classList.add("liking_heart");
        likingHeart.setAttribute("alt", "");
        likingButton.appendChild(likingHeart);
        article.appendChild(div);
        div.appendChild(h3);
        div.appendChild(div2);
        div2.appendChild(h3_2);
        div2.appendChild(likingButton);
        h3.textContent = title;
        h3_2.textContent = likes;


        // La fonction ci-dessous permet, lorsque je clique sur le bouton du like, de redéfinir la valeur like
        // avec la valeur de getLikes incrémentée, et d'actualiser l'affichage de mon h3. 
        // Je définis ensuite une variable totalLikes que j'associe à la fonction getTotalLikes.
        // Cette fonction stockée est en fait passée en paramètre de displayTotalLikes.


        likingButton.addEventListener("click", () => {
            likes = getLikes() + 1;
            h3_2.textContent = likes;



            let currentTotalofLikes = getTotaLikes();

            function displayCurrentTotalLikes(total) {
                const totalLikesSpan = document.querySelector(".total_likes_span");
                totalLikesSpan.innerText = total;

            }

            displayCurrentTotalLikes(currentTotalofLikes);



        })

        return (article);

    }

    return { title, picture, getUserPictures, getLikes, date }
}


// ==================================================================================================

export function priceFactory(data) {

    const { price } = data;


    function getUserPrice() {

        const likesPosition = document.querySelector(".likes_position")
        const price2 = document.createElement("span");
        likesPosition.appendChild(price2);
        price2.classList.add("price_span");
        price2.textContent = `${price}€/jour`;

        return (price2);

    }

    return { price, getUserPrice }

}

// ======================================================================================================

export function lightBoxFactory(data) {

    let { image, video, title } = data;

    const picture = `assets/photographers/${image}`;
    const movie = `assets/photographers/${video}`;
    const lightBox = document.getElementById("lightbox_modal");
    lightBox.style.display = "block";


    // for (let i = 0; i < data.length; i++) {


    // }

    function getUserLightBox() {




        const article = document.createElement('article');
        if (video) {
            const video = document.createElement('video');
            article.appendChild(video);
            video.setAttribute("src", movie);
            video.setAttribute("controls", "width 250");
            video.setAttribute("type", "video/mp4");
            video.setAttribute("class", "lightbox_video");
            video.setAttribute("alt", `${title}`)
        } else {
            const img = document.createElement('img');
            article.appendChild(img);
            img.setAttribute("src", picture);
            img.setAttribute("class", "lightbox_img");
            img.setAttribute("alt", `${title}`);
            img.setAttribute("aria-label", `${title}`);
            img.setAttribute("tabindex", 0);
        }
        const h3 = document.createElement('h3');
        const div = document.createElement('div');

        article.appendChild(div);
        div.appendChild(h3);
        h3.textContent = title;

        return article;
    }

    return {
        image, video, title, getUserLightBox
    }
}