// Doit etre fait pouur le site
// Fonctions pour gérer l'affichage et la fermeture de la modale. 49/70
// Active/désactive la visibilité de la modale.  49/70
// MAJ du contenu de la modale avec les projets existants.
// Ouvre la modale.
// Cliquer pour fermer la modale
// Cliquer pour ajouter une photo (ouvrir le formulaire)
// Cliquer pour annuler l'ajout d'une photo (fermer le formulaire et revenir à la modal galerie)
// Gestion de l'upload d'image.
// FORMULAIRE D'AJOUT DE PROJET
// Valide les entrees
//API
// LIEN COURS https://grafikart.fr/tutoriels/modal-javascript-css-72     TEST.JS

//  SO Utilisateur ok / connecte  ------------------------------------------------------------SI LOGIN ---------------------------------------------------------------------------------------

let loged = localStorage.getItem("loginResponse"); // permet de mettre uniquement si utilisateur connecte /connect les deux pages

const logout = document.querySelector("header nav #login");
const containerModals = document.querySelector(".containerModals"); // jenregistre dans ma variable am class
const modeEdition = document.querySelector(" .mode-edition");
const croiX = document.querySelector(".modalGallerySupression .fa-x");
const modifierModal = document.querySelector(".modifierModal"); //div vide dans la premiere modal
const modalGallerySupression = document.querySelector(".modalGallerySupression"); // premiere modal
// pour la 2nd modal ajout des photos
const buttonAddPhoto = document.querySelector(".modalGallerySupression button");
const modalAjoutPhoto = document.querySelector(".modalAjoutPhoto"); //2nd modal pour ajout des photos
const croiX2 = document.querySelector(".modalAjoutPhoto .fa-x");
const arrowLeftAjoutPhoto = document.querySelector(".modalAjoutPhoto .fa-arrow-left"); // pour fleche retour
//Variables Pour le form
const formAjoutPhoto = document.querySelector("#formAjoutPhoto");
const labelFile = document.querySelector(".labelFile");
const paragraphFile = document.querySelector("#formAjoutWorks p");
const inputTitle = document.querySelector("#title");
const inputCategory = document.querySelector("#categoryInput");
const inputFile = document.querySelector("#image");
const previewImage = document.getElementById("previewImage");
const imageInput = document.getElementById("image")
const previewImageDiv = document.querySelector(".previewImageDiv")
const containerAjoutPhoto = document.querySelector(".containerAjoutPhoto")

if (loged != undefined) {
  // si loged est diferent de non defini alors on retourne  le mode admin
  logout.textContent = "logout";
  modeEdition.style.display = "flex";
  logout.addEventListener("click", () => {
    // au click se deconnect
    console.log("logout")

    modeEdition.style.display = "none";
    localStorage.clear("loginResponse");
    loged = undefined
  });
}

//affiche modal en clik sur modeEdition de la barre noir
modeEdition.addEventListener("click", () => {
  containerModals.style.display = "flex";
  modalGallerySupression.style.display = "flex";
  modalAjoutPhoto.style.display = "none";
});

// au click sur la croix sort de la modal
croiX.addEventListener("click", () => {
  containerModals.style.display = "none";
});

//Fermuture de la modal2 sur la croix 2 Ajout ohoto modal
croiX2.addEventListener("click", () => {
  containerModals.style.display = "none";
  previewImageDiv.style.display = "none";
  containerAjoutPhoto.style.display = "flex";
});

// changenemnt affiche modal  ajout photo en clik sur ajout enleve la supprimer
buttonAddPhoto.addEventListener("click", () => {
  modalAjoutPhoto.style.display = "flex";
  containerModals.style.display = "flex";
  modalGallerySupression.style.display = "none";
  imageInput.value = ""  // fait le reset du formulaire 
  containerAjoutPhoto.style.display = "flex" // affiche le container pour lajout 

});

// click sur la fleche pour le retour sur la modal precedente
arrowLeftAjoutPhoto.addEventListener("click", () => {
  containerModals.style.display = "flex";
  modalGallerySupression.style.display = "flex";
  modalAjoutPhoto.style.display = "none";
});

// je cree ma gallery pour la modal jappel ma fonction en haut de la page
function generateImagesModal(images, containerId) {
  const gallery = document.getElementById(containerId);
  gallery.innerHTML = "";
  //loop creation
  for (let i = 0; i < images.length; i++) {
    //creations des balises
    const article = images[i]; // je cree les articles

    const imageElement = document.createElement("img"); // je cree les images
    imageElement.src = article.imageUrl;
    imageElement.alt = article.title;

    const sectionFigure = document.createElement("figure");
    sectionFigure.setAttribute("images-id", article.id); // cree un numero d'id

    const figCaptionElement = document.createElement("figCaption"); // je cree figcaption
    // figCaptionElement.innerText = article.title; naffiche pas le texte en dessous 

    const span = document.createElement("span"); //je cree  span

    const poubelle = document.createElement("i"); // je cree mon i(icone) et jassocie avec la classe
    poubelle.classList.add("fa-solid", "fa-trash-can"); // attribut une class a la poubelle

    //ratache balises au DOM
    span.appendChild(poubelle); //
    span.appendChild(imageElement);
    sectionFigure.appendChild(span);
    sectionFigure.appendChild(figCaptionElement);
    gallery.appendChild(sectionFigure);
  }

  supressionImage();
}


//supression   https://www.youtube.com/watch?v=Qkna4uD_qcQ
//Supression des works grace a la méthode DELETE & au Token user depuis la poubelle de la modale
//Objet de paramétrage pour requette DELETE avec token  ajout de try catch 1.2.24

function supressionImage(images, containerId) {
  const poubelle = document.querySelectorAll(".fa-trash-can");
  poubelle.forEach((poubelle) => {
    poubelle.addEventListener("click", async (e) => {
      try {
        let sectionFigure = poubelle.parentElement.parentElement;
        let imagesId = sectionFigure.getAttribute("images-id"); // recupere un numero d'id
        const detail = JSON.parse(loged);
        const response = await fetch(`http://localhost:5678/api/works/${imagesId}`, {   // `${interpolation}` remplace le +
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${detail.token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'image");
        }
        console.log("Suppression terminée avec succès");

        showImages()
      } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
      }
    });
  });
}



//Function d'ajout d'un nouveau projet
formAjoutPhoto.addEventListener("submit", (e) => {
  e.preventDefault();
  // Récupération des Valeurs du Formulaire
  const formData = new FormData(formAjoutPhoto);
  for (let info of formData.entries()) {
    console.log(info[0] + "," + info[1])
  }

  const detail = JSON.parse(loged);
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${detail.token}`,

    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du fichier");
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Fichier envoyé avec succès :", data);
      location.reload()
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });

  return false; // devait arreter le reload de la page mais ne marche pas pour le moment
});

async function getCategory() {
  // fonction pour montrer les categrois
  const reponse = await fetch("http://localhost:5678/api/categories");
  const data = await reponse.json();
  return data;
}

//Fonction qui génère les catégorie dynamiquement pour la modale
async function displayCategoryModal() {
  const select = document.getElementById("categoryInput");
  const categorys = await getCategory();
  categorys.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  });
}
displayCategoryModal();

//fonction prévisualisation de l'image a lajout dams la modal  https://www.tutorialspoint.com/preview-an-image-before-it-is-uploaded-in-javascript
function previewSelectedImage() {
  const file = imageInput.files[0];//Récupère le premier fichier sélectionné par l'utilisateur.
  if (file) {
    const reader = new FileReader();// : Crée une instance de l'objet FileReader qui permet de lire le contenu du fichier.

    reader.onload = function (e) {//Configure une fonction à exécuter lorsque la lecture du fichier est terminée.
      const imageUrl = e.target.result;//Récupère l'URL de données généré à partir du contenu du fichier. 209
      previewImage.src = imageUrl;//Affiche l'image en tant que prévisualisation dans la div en utilisant un élément <img> avec l'URL de données. 
      previewImageDiv.style.display = "flex";
      containerAjoutPhoto.style.display = "none";
    }
    reader.readAsDataURL(file);//Lit le contenu du fichier en tant qu'URL de données.
  }
}
imageInput.addEventListener('change', previewSelectedImage);// : Ajoute un écouteur d'événements qui réagit au changement dans le champ d'entrée de fichier.

