
// Cette fonction est la fontion de récupération des données des photographes, elle englobe les données 
// des photographes ainsi que le tableau de ces données qui est retourné.

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    // Cette constante est un tableau dans lequel toutes les données des photographes sont rassemblées
    // pour être affichées sur la page d'accueil, elles ne sont pas encore récupérées dans le json.


    const photographers = [
        {
            "name": "Premier data test",
            "id": 1,
            "city": "Paris",
            "country": "France",
            "tagline": "Ceci est ma data test",
            "price": 400,
            "portrait": "account.png"
        },
        {
            "name": "Deuxième data test",
            "id": 2,
            "city": "Londres",
            "country": "UK",
            "tagline": "Ceci est ma data test 2",
            "price": 500,
            "portrait": "account.png"
        },
        {
            "name": "Troisième data test",
            "id": 2,
            "city": "New York",
            "country": "USA",
            "tagline": "Ceci est ma data test 3",
            "price": 500,
            "portrait": "account.png"
        },
        {
            "name": "Quatrième data test",
            "id": 2,
            "city": "Barcelona",
            "country": "Espagne",
            "tagline": "Ceci est ma data test 4",
            "price": 500,
            "portrait": "account.png"
        },
        {
            "name": "Cinquième data test",
            "id": 2,
            "city": "Berlin",
            "country": "Allemagne",
            "tagline": "Ceci est ma data test 5",
            "price": 500,
            "portrait": "account.png"
        },
        {
            "name": "Sixième data test",
            "id": 2,
            "city": "Ljubljana",
            "country": "Slovenia",
            "tagline": "Ceci est ma data test 6",
            "price": 500,
            "portrait": "account.png"
        },
    ]
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers]
    })
}

// J'ai besoin de comprendre cette fonction d'affichage, notamment le photographerFactory

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes, puis permet l'affichage de ces données.
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
