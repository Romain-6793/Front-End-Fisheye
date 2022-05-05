
// =======================================================================================================

// const closeLightboxBtn = document.querySelector(".close_lightbox");
// closeLightboxBtn.forEach((btn) => btn.addEventListener("click", closeLightBox))

// function closeLightBox() {

//     const lightBox = document.getElementById("lightbox_modal");
//     lightBox.style.display = "none";
//     const likesPopup = document.getElementById("likes_popup");
//     likesPopup.style.display = "block";

// }

// =======================================================================================================



class Carousel {


    /**
     * This callback is displayed as a global member.
     * @callback moveCallback
     * @param {number} index
     * 
     */


    // @param {HTMLElement} element
    // @param {Object} [options.slidesToScroll = 1] Nombre d'éléments à faire défiler en même temps
    // @param {Object} [options.slidesVisible = 1] Nombre d'éléments visibles dans un slide
    // @param {boolean} [options.loop = false] Doit-on boucler en fin de carousel ?

    // dans cette classe, je crée un constructor avec 2 paramètres : éléments et options. Je précise que mes 
    // options par défaut peuvent renvoyer un objet vide .

    constructor(element, options = {}) {

        // J'utilise this. pour activer mes paramètres, d'abord l'élément. Le this permet aussi 
        // d'avoir accès partout à l'élément visé, de dépasser les scopes .

        this.element = element

        // Puis les options, j'utilise la méthode object.assign. Pour créer des subdivisions
        // En premier paramètre, j'utilise un objet vide afin de fusionner options avec ce 
        // fameux objet, ce qui permet, s'il y a un problème avec un des paramètres, d'être quand 
        // même tranquille. Car des valeurs sont fixées par défaut.
        // En deuxième paramètre, j'utilise un objet avec deux propriétés (mes options en fait) : 
        // slidesToScroll et slidesVisible que je fixe par défaut à 1.
        // En troisième paramètre, je passe le paramètre "options" de mon constructor.

        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)

        // // J'utilise this.children pour me servir des enfants (HTML) de l'élément du constructor 
        // // (plus bas on verra que c'est id = carousel_1).

        // Par précaution, j'utilise [].slice.call. Pour créer un tableau vide que je vais remplir
        // avec l'objet-fonction slice et sa méthode call qui va appeler les enfants de l'élément.
        // Ainsi, je suis sûr qu'il n'y aura rien d'autre dans le tableau. Car je ne veux avoir que
        // les enfants à ce moment là de l'execution. 

        // this.currentItem = 0 désigne au départ le premier item du tableau (la première slide).

        // let children = [].slice.call(element.children)
        // this.currentItem = 0

        // Ci-dessous, on appelle la fonction this.createDivWithClass en lui passant comme argument
        // la className "carousel", ce faisant, on crée la div "carousel".
        // Juste en dessous, on fait la même chose avec "carousel_container".


        this.root = this.createDivWithClass("carousel")
        this.container = this.createDivWithClass("carousel__container")
        console.log(this.root)
        console.log(this.container)



        // Ici, on affilie container à root (la div "carousel"), puis on affilie root à this.element 
        // (la div "carousel1")

        this.element.appendChild(this.root)
        this.root.appendChild(this.container)



    }

    // @param {String} (className) 
    // @returns {HTMLElement}

    // la méthode createDivWithClass qui a pour paramètre "className" sert à créer des div 
    // et à leur attribuer une classe. C'est une méthode très pratique qui regroupe createElement et
    // setAttribute et qui a pour valeur de retour la variable "div".

    createDivWithClass(className) {
        let div = document.createElement("div");
        div.setAttribute("class", className);
        return div;
    }

}

// Ici, nous avons quelque part notre fonction d'initialisation avec comme EL DOMContentLoaded, cela veut
// dire qu'il faut attendre que tout soit chargé pour lancer la fonction callback, cette fonction
// crée une instance de l'objet Carousel et tout ce qui suit, ici, on va pouvoir paramétrer le nombre 
// de slides qui défilent en même temps, ainsi que le nombre de slides visibles à l'écran.

// J'ai retiré l'EL DOMContentLoaded pour le test, cela peut venir de là...


export function createCarousel() {


    const myCarousel = new Carousel(document.getElementById("container_flex"), {
        slidesToScroll: 1,
        slidesVisible: 1,
        loop: false

    })
    console.log(myCarousel);
    console.log(myCarousel.element);
}


