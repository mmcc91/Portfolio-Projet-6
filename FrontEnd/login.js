
// Écouteur d'événement sur le formulaire de login
const loginForm = document.getElementById('formulaireLogin');
loginForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupération des donnees/valeurs des champs d'entrée
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Vérification des valeurs
  if (email.trim() === '' || password.trim() === '') { // trim enleve les espace 
    alert('Veuillez remplir tous les champs');
    return;
  }
  submitLogin(email, password)
});

async function submitLogin(email, password) {
  const loginResponse = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (loginResponse.ok) {
    const data = await loginResponse.json();
    //enregistre le login
    localStorage.setItem("loginResponse", JSON.stringify(data)) ;
    //redirige vers la page index  plus tard page des modifications 
    document.location.href = "index.html"
  } else if (loginResponse.status === 404) {
    alert("Utilisateur non trouve ")
  } else if (loginResponse.status === 401) {
    alert("Utilisateur non autorise")
  }
}

