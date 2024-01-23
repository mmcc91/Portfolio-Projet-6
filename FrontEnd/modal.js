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

const loged = localStorage.getItem("loginResponse"); // permet de mettre uniquement si utilisateur connecte /connect les deux pages

const logout = document.querySelector("header nav #login");
const containerModals = document.querySelector(".containerModals"); // jenregistre dans ma variable am class
const modeEdition = document.querySelector(" header .mode-edition");
const croiX = document.querySelector(".modalModifier .fa-x");
const modifierModal = document.querySelector(".modifierModal"); //div vide dans la premiere modal
const modalModifier = document.querySelector(".modalModifier"); // premiere modal
// pour la 2nd modal ajout des photos
const buttonAddPhoto = document.querySelector(".modalModifier button");
const modalAjoutPhoto = document.querySelector(".modalAjoutPhoto"); //2nd modal pour ajout des photos
const croiX2 = document.querySelector(".modalAjoutPhoto .fa-x");
const arrowLeftAjoutPhoto = document.querySelector(".modalAjoutPhoto .fa-arrow-left"); // pour fleche retour
//Variables Pour le form
const formAjoutPhoto = document.querySelector("#formAjoutPhoto");
const labelFile = document.querySelector("#formAddWorks label");
const paragraphFile = document.querySelector("#formAjoutWorks p");
const inputTitle = document.querySelector("#title");
const inputCategory = document.querySelector("#categoryInput");
const inputFile = document.querySelector("#file");
const previewImage = document.getElementById("previewImage");
const imageInput =document.getElementById("image")

if (loged != undefined) {
  // si loged est diferent de non defini alors on retourne  le mode admin
  logout.textContent = "logout";
  logout.addEventListener("click", () => {
    // au click se deconnect
    logout.removeEventListener("click", false);
  });
}

//affiche modal en clik sur modeEdition de la barre noir
modeEdition.addEventListener("click", () => {
  containerModals.style.display = "flex";
  modalModifier.style.display = "flex";
  modalAjoutPhoto.style.display = "none";
});

// au click sur la croix sort de la modal
croiX.addEventListener("click", () => {
  containerModals.style.display = "none";
});

//Fermuture de la modal2 sur la croix 2 Ajout ohoto modal
croiX2.addEventListener("click", () => {
  //Supréssion de la prewiew a clik sur retour dans la modale
  inputFile.value = "";
  previewImage.style.display = "none";
  containerModals.style.display = "none";
});

// changenemnt affiche modal  ajout photo en clik sur ajout enleve la supprimer
buttonAddPhoto.addEventListener("click", () => {
  modalAjoutPhoto.style.display = "flex";
  containerModals.style.display = "flex";
  modalModifier.style.display = "none";
});

// click sur la fleche pour le retour sur la modal precedente

arrowLeftAjoutPhoto.addEventListener("click", () => {
  containerModals.style.display = "flex";
  modalModifier.style.display = "flex";
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
    figCaptionElement.innerText = article.title;

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
//Objet de paramétrage pour requette DELETE avec token

function supressionImage(images, containerId) {
  const poubelle = document.querySelectorAll(".fa-trash-can");
  poubelle.forEach((poubelle) => {
    poubelle.addEventListener("click", async (e) => {
      let sectionFigure = poubelle.parentElement.parentElement;
      let imagesId = sectionFigure.getAttribute("images-id"); // recupere un numero d'id
      const detail = JSON.parse(loged);
      await fetch("http://localhost:5678/api/works/" + imagesId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${detail.token}`,
          "Content-Type": "application/json",
        }, // essaye try catch pour recupere les erreurs
      });
      console.log("delete completed");
      showImages();
    });
  });
}

//Function d'ajout d'un nouveau projet

formAjoutPhoto.addEventListener("submit", (e) => {
  e.preventDefault();
  // Récupération des Valeurs du Formulaire
  const formData = new FormData(formAjoutPhoto);
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
      showImages();
      formAjoutPhoto.reset();
      modalModifier.style.display = "none";
      modalAjoutPhoto.style.display = "flex";
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

//fonction prévisualisation de l'image
function prevImg() {
  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
        // labelFile.style.display ="none"
        // paragraphFile.style.display ="none"
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.style.display = "none";
    }
  });
}

// fontion qui vérifie si tout les inputs sont remplis
function verifFormCompleted() {
  const buttonValidForm = document.querySelector(".container-button-ajout-photo  button");
  formAddWorks.addEventListener("input", () => {
    if (!inputTitle.value == "" && !inputFile.files[0] == "") {
      buttonValidForm.classList.remove("button-ajout-photo");
      buttonValidForm.classList.add("buttonValidForm");
    } else {
      buttonValidForm.classList.remove("buttonValidForm");
      buttonValidForm.classList.add("button-ajout-photo");
    }
  });
}
// previe 
function imagePreviewDisplay() {
    imageInput.addEventListener('change',(e) => { // : Ajoute un écouteur d'événements qui réagit au changement dans le champ d'entrée de fichier.
      const file = imageInput.files[0]; //Récupère le premier fichier sélectionné par l'utilisateur.

      if (file) {//Vérifie si un fichier a été sélectionné.
        const reader = new FileReader(); // : Crée une instance de l'objet FileReader qui permet de lire le contenu du fichier.

        reader.onload = function(e) { //Configure une fonction à exécuter lorsque la lecture du fichier est terminée.
          const imageUrl = e.target.result;//Récupère l'URL de données généré à partir du contenu du fichier.
          previewImage.src= imageUrl;
        };//Affiche l'image en tant que prévisualisation dans la div en utilisant un élément <img> avec l'URL de données. Les styles CSS limitent la largeur à 100% et la hauteur à 200 pixels.

        reader.readAsDataURL(file); //Lit le contenu du fichier en tant qu'URL de données.
      } else {
        previewImage.innerHTML = ''; // Si aucun fichier n'est sélectionné, vide la div de prévisualisation.
      }
    });
}

imagePreviewDisplay()