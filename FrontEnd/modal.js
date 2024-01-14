let modal = null
const focusableSelectors = "button , a , input, texarea"  // definit otus les elements focusables 
let focusablesElements = [] // tableau vide delement focusable
let previouslyFocusElement = null // var

const openModal = function (e) {// functiom  qui prend en parametre levenement evenement = e 
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute("href")) // dans le lien je recupere l'attribut href ici retour #modal1
    focusablesElements = Array.from(modal.querySelectorAll(focusableSelectors)) // met dans le tableau tous les elements focusables trouve dans la fu
    focusablesElements[0].focus() // element 0 par defaul focus 
    modal.style.display = 'block' // montre la modal
    modal.removeAttribute('aria-hidden') // enleve latribut cache 
    modal.setAttribute('aria-modal', 'true') // 
    modal.addEventListener("click", closeModal) // permet de pouvoir fermer la modal
    modal.querySelector(".js-close-modal").addEventListener("click", closeModal) // quand je clique jsur mon js-c-m alors close modal sactive 
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation) // jappel la fuction stop porpagation
}


// creation de la fonction qui prend en paramettre levenement  
const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusElement !== null) previouslyFocusElement.focus()
    e.preventDefault()
    modal.setAttribute('aria-hidden', 'true') // cache 
    modal.removeAttribute('aria-modal') // enleve la modal
    modal.removeEventListener("click", closeModal) // permet de  fermer la modal
    modal.querySelector(".js-close-modal").removeEventListener("click", closeModal) // annule l'openmodal
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation) // annule stop porpagation
    window.setTimeout(function () {  //pour avoir une animation au retrait de la modal
        modal.style.display = 'none' // cache la modal
        modal = null // a revoir 
    }, 500); // a revoir 
}

// function qui permet de resoudre le pb de click , je clique n'importe ou ma page modal reste ouverte sauf si je clique sur fermer 
const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModale = function (e) {
    e.preventDefault()
    let index = focusablesElements.findIndex(f => f === modal.querySelector(':focus')) // montre lelement ou lon est focus 
    if (e.shiftkey === true) {// si on appuie sur shift alors on va en sens recule
        index--
    } else { // on va dams le sens avance
        index++
    }
    if (index >= focusablesElements.length) { //pour revenir a 0 une fois le dernier elements atteint dans le sens avance 
        index = 0
    }
    if (index < 0) {// si index inferieur a0
        index = focusablesElements.length - 1 // pour revenir au 1er element sens recule + permet de bouclet a linterieur de la boite modal
    }

    focusablesElements[index].focus()

}

document.querySelectorAll('.js-modal').forEach(a => { // je selectionne tous les elements de la classe js-modal pour chaque lien 
    a.addEventListener("click", openModal) // a chaque fois que lon clique sur le lien jappel la fonction oenpMdal
})
// permet de fermet avec touche clavier escape echap . NAVIGATION CLAVIER 
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "tab" && modal !== null) {
        focusInModale(e)
    }
})