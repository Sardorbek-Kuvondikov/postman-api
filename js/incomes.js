let token = window.localStorage.getItem("token");
if (!token) {
  window.location.pathname = "./login.js";
}
const elLogOut = document.querySelector(".js-logout");
elLogOut.addEventListener("click", (evt) => {
  evt.preventDefault();
  window.localStorage.removeItem("token");
  window.location.pathname = "../login.html";
});

const elForm = document.querySelector(".js-form"),
  elTitleInp = elForm.querySelector(".js-incomes-title"),
  elAmountInp = elForm.querySelector(".js-incomes-amount"),
  elCategorieInp = elForm.querySelector(".js-incomes-category"),
  elDescriptionInp = elForm.querySelector(".js-incomes-description"),
  elDateInp = elForm.querySelector(".js-incomes-date");

const elRenderList = document.querySelector(".js-incomes-text");
const elTemplate = document.querySelector(".js-incomes-template").content;

// FETCH DATA
async function userData() {
  let res = await fetch("http://localhost:9090/add-income", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImRmeHhhcmZhcnNmIiwiZW1haWwiOiJyb3NoeHhtYXQiLCJpYXQiOjE3MDM1MTgxOTF9.iu8jl3R0QTrE3oIYkxFYbZ7fwaeyW_KzuEbsURMPJdA",
    },
    body: JSON.stringify({
      title: elTitleInp.value.trim(),
      amount: elAmountInp.value,
      category: elCategorieInp.value.trim(),
      description: elDescriptionInp.value.trim(),
      date: elDateInp.value.trim(),
    }),
  });
  userGetDate();
}

// GET DATA
async function userGetDate() {
  let res = await fetch("http://localhost:9090/get-incomes", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImRmeHhhcmZhcnNmIiwiZW1haWwiOiJyb3NoeHhtYXQiLCJpYXQiOjE3MDM1MTgxOTF9.iu8jl3R0QTrE3oIYkxFYbZ7fwaeyW_KzuEbsURMPJdA",
    },
  });
  let data = await res.json();
  renderList(data, elRenderList);
}

// DELETE
async function userDelete(id) {
  let res = await fetch(`http://localhost:9090/delete-income/${id}`, {
    method: "DELETE",
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjFxczIzM3JlZyIsImVtYWlsIjoiZXNzaG1hdEBnYW1pbC5jb20iLCJpYXQiOjE3MDU2NjA1NjV9.KfA4XmQ0vWbfSgPiDiDxE1SPYSa4Jsexdw4CsI9A0ZY",
    },
  });
  userGetDate();
}

// RENDER LIST
function renderList(data, node) {
  node.innerHTML = "";
  const docFrg = document.createDocumentFragment();
  data.forEach((item) => {
    const cloneTemplate = elTemplate.cloneNode(true);

    cloneTemplate.querySelector(".js-title").textContent = item.title;
    cloneTemplate.querySelector(".js-amount").textContent = item.amount;
    cloneTemplate.querySelector(".js-category").textContent = item.category;
    cloneTemplate.querySelector(".js-description").textContent =
      item.description;
    cloneTemplate.querySelector(".js-date").textContent = item.date.slice(
      0,
      10
    );
    cloneTemplate.querySelector(".js-delete-btn").dataset.dataId = item.id;
    docFrg.appendChild(cloneTemplate);
  });
  node.appendChild(docFrg);
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userData();
  elForm.reset();
});

userGetDate();

elRenderList.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (evt.target.closest(".js-delete-btn")) {
    let id = evt.target.dataset.dataId;
    userDelete(id);
  }
});
