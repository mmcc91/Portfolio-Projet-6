async function login() {
  const loginEmail = document.getElementById("email").value;
  const loginpassword = document.getElementById("password").value;

  const user = {
    email: loginEmail,
    password: loginpassword,
  };


    then((res) => {
    if (res.ok) {
      res.json()
        .then((data) => {
          const userdata = data.token;
          if (localStorage.user = userdata)
            document.location.href = ("edit.html");
        })
    } else {
      document.querySelector(".error").innerHTML = "L'identifiant ou/et le mot de passe est/sont incorrect";
    }
  });
}

const btnForm = document.querySelector(".connexion");
btnForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});