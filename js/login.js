let token = window.localStorage.getItem("token");
if (token) window.location.pathname = "../index.html";

const elLoginForm = document.querySelector(".js-login-form"),
  elLoginEmail = elLoginForm.querySelector(".js-login-email"),
  elLoginPassword = elLoginForm.querySelector(".js-login-password");

async function userLogin() {
  let res = await fetch("http://localhost:9090/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: elLoginEmail.value.trim(),
      password: elLoginPassword.value,
    }),
  });
  let data = await res.json();
  if (data.token) {
    window.localStorage.setItem("token", data.token);
    window.location.pathname = "../index.html";
  }
}

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userLogin();
});
