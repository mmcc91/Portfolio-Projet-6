async function login() {
  const loginForm = document.getElementById("connexion");
  const loginButton = document.getElementById("submit");
  const loginErrorMsg = document.getElementById("login-error-msg");


  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })

  loginButton.addEventListener("click", connect());

  function connect(){
    const loginEmail = document.getElementById("email").value;
    const loginMotDePasse = document.getElementById("motdePasse").value;
    if (email === loginEmail  && motdePasse === loginMotDePasse) {
      console.log(" you are in ");
    } else {
      console.log("L'identifiant ou le mot de passe est/sont incorrect")
    };

    const user = {
      email: loginEmail,
      motdePasse: loginMotDePasse,
    };

  }
}
