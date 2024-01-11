const openModal = function (e) {// functiom  qui prend en parametre levenement evenement = e 
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href")) // dans le lien je recupere l'attribut href ici retour #modal1
    target.style.display = 'block'

    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
}

const jsModalElements = document.querySelectorAll('.js-modal');

jsModalElements.forEach(a => { // je selectionne tous les elements de la classe js-modal pour chaque lien 
    a.addEventListener("click", openModal) // a chaque fois que lon clique sur le lien jappel la fonction oenpMdal
})

console.log(`Runnin!`)