
// Cette macro fonction nous permet de créer l'objet "photographer". Avec toutes ses propriétés.

function photographerFactory(data) {
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

    // Ligne 36, j'ai pu associer une url aux liens avec le href, puis ajouter un query parameter avec ?
    // Et ajouter id = ${id}, c'est à dire, ma propriété id de l'objet photographers (dans le json).

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const span = document.createElement('span');
        const p = document.createElement('p');
        const a = document.createElement('a');
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

function bannerFactory(data) {
    const { name, city, country, tagline, portrait } = data;

    // La constante "picture" nous permet de tracer un chemin vers la propriété "portrait" de l'objet 
    // photographers , cette propriété stockée dans la constante "picture" est ensuite placée comme attribut 
    // src de l'image qui est créee ci-dessous. Image qui servira ensuite d'emplacement, pour les 
    // photographes.

    const picture = `assets/photographers/${portrait}`;

    // Cette fonction, déclarée à l'intérieur de photographerFactory, nous permet de créer pour chaque 
    // photographe une image ainsi qu'un titre h2, elle attribue la constante "picture" à 
    // l'image crée, elle fait en sorte que le contenu du h2 soit le contenu de "name", enfin, elle place 
    // l'image et le h2 comme enfants de la division photograph-header et retourne la division.


    function getUserBanner() {

        const article = document.createElement('article');
        // photograph-header.appendChild(article);
        const img = document.createElement('img');
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const btn = document.getElementById('cbtn');
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

    // Nous avons comme valeur de retour les constantes name et picture ainsi que la fonction
    // getUserBanner, sans parenthèses ?

    return { name, picture, getUserBanner }
}
