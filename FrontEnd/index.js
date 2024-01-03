let works = []
async function loadingImages() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const data = await reponse.json();
  works = data
  newFunction(data)
   mesfiltres()
}

//recupertation des pieces depuis fichier
function newFunction(images) {
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
// appel de la focntion pour montrer les images 
window.onload = loadingImages
// fin  pout faire apparaitre les projets 

//    FILTRES 
function mesfiltres() {
  let mesFiltres = document.createElement("div")
  mesFiltres.classList.add("mesfiltres")
  mesFiltres.id = "mes-filtres"
  const gallery = document.getElementById("gallery");
  gallery.parentElement.insertBefore(mesFiltres, gallery);
  tous()
  objects()
  appartemnt()
  hotel()
}

function tous() {
  let divTous = document.createElement("div")
  divTous.classList.add('filtres')
  let divTousContent = document.createTextNode("Tous");
  divTous.appendChild(divTousContent)
  const mesFiltres = document.getElementById("mes-filtres");
  mesFiltres.appendChild(divTous);
  divTous.addEventListener("click", filtreTous);
  function filtreTous() {
    newFunction(works)
    console.log(divTous)
  }
}

function objects() {
  let divObjets = document.createElement("div")
  divObjets.classList.add('filtres')
  let divObjetsContent = document.createTextNode("objects");
  divObjets.appendChild(divObjetsContent)
  const mesFiltres = document.getElementById("mes-filtres");
  mesFiltres.appendChild(divObjets);
  divObjets.addEventListener("click", filtreObjet);
  function filtreObjet() {
    const result = works.filter(work => work.category.id === 1)
    newFunction(result)
    console.log(divObjets)
  }
}

function appartemnt() {
  let divAppartements = document.createElement("div")
  divAppartements.classList.add('filtres')
  let divAppartementsContent = document.createTextNode("appartemnt");
  divAppartements.appendChild(divAppartementsContent)
  const mesFiltres = document.getElementById("mes-filtres");
  mesFiltres.appendChild(divAppartements);
  divAppartements.addEventListener("click", filtreAppartements);
  function filtreAppartements() {
    const result = works.filter(work => work.category.id === 2)
    newFunction(result)
    console.log(divAppartements)
  }
}

function hotel() {
  let divHotel = document.createElement("div")
  divHotel.classList.add('filtres')
  let divHotelContent = document.createTextNode("Hotel et restaurant");
  divHotel.appendChild(divHotelContent)
  const mesFiltres = document.getElementById("mes-filtres");
  mesFiltres.appendChild(divHotel);
  divHotel.addEventListener("click", filtreHotel);
  function filtreHotel() {
    const result = works.filter(work => work.category.id === 3)
    newFunction(result)
    console.log(divHotel)
  }
}


function mesFiltres(categorie) {
  const result = works.filter(work => work.category.name === categorie)
}


