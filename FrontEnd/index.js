let works = []

async function showImages() { // fonction pour montrer les images 
  const reponse = await fetch("http://localhost:5678/api/works");
  const data = await reponse.json();
  works = data
  mesfiltres()
  displayModificationModal()
}

//recupertation des pieces depuis fichier
function generateImages(images, containerId) {
  const gallery = document.getElementById(containerId);
  gallery.innerHTML = ""

  //loop creation 
  for (let i = 0; i < images.length; i++) {
    //creations des balises
    const article = images[i];
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.title;
    const figCaptionElement = document.createElement("figCaption");
    figCaptionElement.innerText = article.title;
    //ratache balises au DOM
    const sectionFigure = document.createElement("figure");
    sectionFigure.appendChild(imageElement);
    sectionFigure.appendChild(figCaptionElement);
    gallery.appendChild(sectionFigure);
  }
}
// fin  pout faire apparaitre les projets 

//    FILTRES 
function mesfiltres() {
  let mesFiltres = document.createElement("div")
  mesFiltres.classList.add("mesfiltres")
  mesFiltres.id = "mes-filtres"
  const gallery = document.getElementById("gallery");
  gallery.parentElement.insertBefore(mesFiltres, gallery);
  generateFiltres("Tous", "tous", 0, true);
  generateFiltres("Objets", "objet", 1, false);
  generateFiltres("Appartement", "appartement", 2, false);
  generateFiltres("Hôtels & restaurants", "hotels", 3, false);
}

function generateFiltres(nomFiltre, idFiltre, categoryID, filtreSelected) {
  const filterDiv = document.createElement("div")
  filterDiv.id = idFiltre
  filterDiv.classList.add('filtres')
  const filterDivContent = document.createTextNode(nomFiltre);
  filterDiv.appendChild(filterDivContent)
  const mesFiltres = document.getElementById("mes-filtres");
  mesFiltres.appendChild(filterDiv);
  filterDiv.addEventListener("click", generateClickHandler(idFiltre, categoryID));
  if (filtreSelected === true) {
    activateFilter(idFiltre, categoryID)
  }
}

function generateClickHandler(filterID, categoryID) {
  return function () {
    activateFilter(filterID, categoryID)
  }
}
function activateFilter(filterID, categoryID) {
  const filtres = document.getElementsByClassName("filtres")
  for (let i = 0; i < filtres.length; i++) {
    const filtre = filtres[i]
    filtre.classList.remove("filtres-active")
  }
  const filtreSelected = document.getElementById(filterID)
  filtreSelected.classList.add("filtres-active")
  if (categoryID === 0) {
    generateImages(works, "gallery")
  }
  else {
    const result = works.filter(work => work.category.id === categoryID)
    generateImages(result, "gallery")
  }
}

showImages()

//  SO Utilisateur ok / connecte 
const loged = localStorage.getItem("loginResponse");  // permet de mettre uniquement si utilisateur connecte /connect les deux pages 

const logout = document.querySelector("header nav #login");
const containerModals = document.querySelector(".containerModals"); // jenregistre dans ma variable am class
const modeEdition = document.querySelector(' header .mode-edition');
const croiX = document.querySelector(".containerModals .fa-x")
const modifierModal = document.querySelector(".modifierModal")

if (loged != undefined) {  // si loged est diferent de non defini alors on retourne  le mode admin 
  logout.textContent = "logout";
  logout.addEventListener("click", () => {  // au click se deconnect 
    logout.removeEventListener("click", false)
  })
}

//affiche modal en clik sur modeEdition de la barre noir 
modeEdition.addEventListener("click", () => {
  containerModals.style.display = "flex";
})

// au click sur la croix se deconnect 
croiX.addEventListener("click", () => {
  containerModals.style.display = "none";
})

//affiche les images dans la modal
async function displayModificationModal() {
  modifierModal.innerHTML = "" // met a vide mon display 
  const modifier = generateImages(works, "modifier")
  modifier.forEach(images => {  // on cree les differents ellements quon va avoir besoin  pour afficher 
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const span = document.createElement("span")
    const poubelle = document.createElement("i")
    poubelle.classList.add("fa-solid", "fa-trash-can") // attribut une class a la poubelle
    poubelle.id = images.id   //va mettre dans la poubelle lelement qui correspond
    imgElement.src = article.imageUrl;
    span.appendChild(poubelle) //
    figure.appendChild(span)
    figure.appendChild(img)
    modifierModal.appendChild(figure) // systemen poupee russe 

  });
  supressionImage()
}


//supression   https://www.youtube.com/watch?v=Qkna4uD_qcQ

function supressionImage(){
const poubelleAll = document.querySelectorAll(".fa-trash")
poubelleAll.forEach(poubelle =>{
  poubelle.addEventListener("click",(e)=>{
   let  id = poubelle.id
   const init ={ // je prepare un object qui sera parametre a mon fetch 
    method : "DELETE",
    Headers: {"content-type":"application/json"},
   }
   fetch("http://localhost:5678/api/works" + id, init ) // recupere id de chaque poubelle 
   .then ((response)=>{
    if (!response.ok){
      console.log ("delete ne marche pas ")
    }
    return reponse.json()
   })
   .then((data)=>{
    console.log ("ca marche voici la data ")
    displayModificationModal()
    generateImages()
  })
}) 
});
}