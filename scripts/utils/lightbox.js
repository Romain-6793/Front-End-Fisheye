
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
    // @param {boolean} [options.loop = true] Doit-on boucler en fin de carousel ?

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
            loop: true
        }, options)

        // // J'utilise this.children pour me servir des enfants (HTML) de l'élément du constructor 
        // // (plus bas on verra que c'est id = carousel_1).

        // Par précaution, j'utilise [].slice.call. Pour créer un tableau vide que je vais remplir
        // avec l'objet-fonction slice et sa méthode call qui va appeler les enfants de l'élément.
        // Ainsi, je suis sûr qu'il n'y aura rien d'autre dans le tableau. Car je ne veux avoir que
        // les enfants à ce moment là de l'execution. 

        // this.currentItem = 0 désigne au départ le premier item du tableau (la première slide).

        let children = [].slice.call(element.children)
        console.log(children)
        this.currentItem = 0

        // Ci-dessous, on appelle la fonction this.createDivWithClass en lui passant comme argument
        // la className "carousel", ce faisant, on crée la div "carousel".
        // Juste en dessous, on fait la même chose avec "carousel_container".


        this.root = this.createDivWithClass("carousel")
        this.container = this.createDivWithClass("carousel__container")
        console.log(this.root)
        console.log(this.container)



        // Ici, on affilie container à root (la div "carousel"), puis on affilie root à this.element 
        // (la div "carousel1")

        this.root.appendChild(this.container)
        this.element.appendChild(this.root)

        // Ici , je crée un tableau vide (en propriété d'instance) pour stocker les callbacks .

        this.moveCallbacks = []

        // Ici , depuis this.items avec la méthode map (pour parcourir chaque enfant), on prend 
        // chaque "child" (les items), et pour chacun, on leur crée un parent (la div "carousel__item"). 
        // On affilie ensuite chaque item/child à ce parent (carousel_item). Ce même parent, on l'affilie 
        // au carousel container.
        // On l'a donc placé entre carousel__container et item, il va lui même servir de petit container
        // pour chaque item.
        // La fonction fléchée remplace la méthode bind pour que this fasse référence à la classe.

        this.items = children.map((child) => {
            let item = this.createDivWithClass("carousel__item")
            item.appendChild(child)
            this.container.appendChild(item)
            return item;
        });

        this.setStyle()
        this.createNavigation()
        this.moveCallbacks.forEach(callback => callback(0))



    }

    // Cette méthode va nous permettre de rajouter du style (dimensions) à chaque item du carousel.

    setStyle() {

        // Le ratio ci-dessous sert à calculer la taille du carousel_container : on divise le nombre 
        // d'enfants (les items) par les slidesVisible, ce qu'on doit voir affiché à l'écran.
        // C'est la première étape pour définir la taille du container avant de le convertir en 
        // pourcentage.

        let ratio = this.items.length / this.options.slidesVisible

        // Ici on définit la taille du container en convertissant le ratio en pourcentage.

        this.container.style.width = (ratio * 100) + "%"

        // Pour le calcul de item.style.width, je divise 100 (qui correspond à 100%) par 
        // le nombre de slidesVisible, je divise le tout par le ratio, et j'ajoute le signe du pourcentage.


        this.items.forEach(item => {
            item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%"

        });

    }

    createNavigation() {

        let prevButton = document.querySelector(".carousel_prev");
        let nextButton = document.querySelector(".carousel_next");
        nextButton.addEventListener("click", this.next.bind(this))
        prevButton.addEventListener("click", this.prev.bind(this))

        // Ci-dessous, si on a activé la boucle, pas besoin du onMove pour écouter les boutons.
        // En effet , le return empêche l'execution du code qui suit.

        if (this.options.loop === true) {
            return
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add("carousel_prev--hidden")
            } else {
                prevButton.classList.remove("carousel_prev--hidden")
            }
            if (this.items[this.currentItem + this.options.slidesVisible] === undefined) {
                nextButton.classList.add("carousel_next--hidden")
            } else {
                nextButton.classList.remove("carousel_next--hidden")
            }
        })

        // bind sert à ne pas perdre le contexte, ainsi "this" utilisé dans la méthode next ou prev fera 
        // bien référence à notre classe.

    }

    // Les méthodes next et prev servent à passer d'une slide à l'autre.

    next() {

        console.log(this.options.slidesToScroll)

        this.goToItem(this.currentItem + this.options.slidesToScroll)
        // this.goToItem(this.currentItem + 1)

    }

    prev() {

        console.log(this.options.slidesToScroll)

        this.goToItem(this.currentItem - this.options.slidesToScroll)
        // this.goToItem(this.currentItem - 1)

    }

    // Déplace le carousel vers l'élément ciblé
    // @param {Number} index 

    // condition scroll prev: si l'index est inférieur à zéro, il revient à la 
    // première slide(on soustrait les slidesVisible à l'étendue et on affecte cette valeur à index)


    goToItem(index) {

        // Cette condition me permet de revenir à la slide 0 en bout de carousel

        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length ||
            (this.items[this.currentItem + this.options.slidesVisible]
                === undefined && index > this.currentItem)) {
            index = 0
        }

        // Le && sert à ne pas directement revenir à la slide 0 lorsqu'on repart vers la gauche.

        // Ici je crée un transform/translate afin qu'au clic du next, la currentSlide(index) aille vers la gauche
        // Le currentItem(index) se décale donc vers la gauche de 100% divisé par le nombre d'items.
        // Le transform s'opère sur la ligne du milieu avec un pourcentage.


        let translateX = index * (-100 / this.items.length)
        this.container.style.transform = "translate3d(" + translateX + "%, 0, 0)"
        this.currentItem = index
        this.moveCallbacks.forEach(callback => callback(index))

        // Dans la dernière ligne, je crée un système d'événement pour mettre index en param de chaque callback
    }

    // @param {moveCallback} callback
    // Cette méthode va servir à enregistrer chaque callback dans this.moveCallbacks déclénché par chaque
    // changement de slide.

    onMove(callback) {

        this.moveCallbacks.push(callback)

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


export function createCarousel(idx = 0) {


    const myCarousel = new Carousel(document.querySelector(".carousel_window"), {
        slidesToScroll: 1,
        slidesVisible: 1,
        loop: true

    })
    window.carou = myCarousel;
    myCarousel.goToItem(idx)
    console.log(myCarousel);
    console.log(myCarousel.element);
}


