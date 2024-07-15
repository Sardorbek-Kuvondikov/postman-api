let token = window.localStorage.getItem("token");
if (token) window.location.pathname = "../index.html";

const elRegisterForm = document.querySelector(".js-register-form"),
  elLastNmaeInp = elRegisterForm.querySelector(".js-lastname"),
  elFirstNmaeInp = elRegisterForm.querySelector(".js-firstname"),
  elEmailInp = elRegisterForm.querySelector(".js-email"),
  elPasswordInp = elRegisterForm.querySelector(".js-password"),
  elAgedInp = elRegisterForm.querySelector(".js-age");

async function userRegister() {
  try {
    let res = await fetch("http://localhost:9090/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        last_name: elLastNmaeInp.value.trim(),
        frist_name: elFirstNmaeInp.value.trim(),
        email: elEmailInp.value.trim(),
        password: elPasswordInp.value,
        age: elAgedInp.value,
      }),
    });
    let data = await res.json();

    if (data.token) {
      window.localStorage.setItem("token", data.token);
      window.location.pathname = "../index.html";
    }
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

elRegisterForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userRegister();
});
