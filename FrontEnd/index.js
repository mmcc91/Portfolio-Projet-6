let works = []

async function showImages() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const data = await reponse.json();
  works = data
  mesfiltres()
}

//recupertation des pieces depuis fichier
function generateImages(images) {
  const gallery = document.getElementById("gallery");
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
    generateImages(works)
  }
  else {
    const result = works.filter(work => work.category.id === categoryID)
    generateImages(result)
  }
}

showImages()











