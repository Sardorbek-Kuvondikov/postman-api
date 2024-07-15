let token = window.localStorage.getItem("token");
if (!token) {
  window.location.pathname = "../login.html";
}

const elLogOut = document.querySelector(".js-logout");
elLogOut.addEventListener("click", (evt) => {
  evt.preventDefault();
  window.localStorage.removeItem("token");
  window.location.pathname = "../login.html";
});

const elRenderList = document.querySelector(".js-text");
const elTemplate = document.querySelector(".js-template").content;

let arr = [];
async function getData() {
  try {
    let res = await fetch("http://localhost:9090/get-incomes", {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImRmeHhhcmZhcnNmIiwiZW1haWwiOiJyb3NoeHhtYXQiLCJpYXQiOjE3MDM1MTgxOTF9.iu8jl3R0QTrE3oIYkxFYbZ7fwaeyW_KzuEbsURMPJdA",
      },
    });
    if (res.ok) {
      let data = await res.json();
      incomeFn(data);
      arr.push(...data);
    }
  } catch (error) {
    console.error("xatolik yuz berdi:", error);
  }
}
getData();

async function getExpensesData() {
  try {
    let res = await fetch("http://localhost:9090/get-expenses", {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImRmeHhhcmZhcnNmIiwiZW1haWwiOiJyb3NoeHhtYXQiLCJpYXQiOjE3MDM1MTgxOTF9.iu8jl3R0QTrE3oIYkxFYbZ7fwaeyW_KzuEbsURMPJdA",
      },
    });
    if (res.ok) {
      let data = await res.json();
      expensesFn(data);
      arr.push(...data);
      renderListData(arr, elRenderList);
    }
  } catch (error) {
    console.error("xatolik yuz berdi:", error);
  }
}
getExpensesData();

function renderListData(data, node) {
  node.innerHTML = "";
  data.sort((a, b) => {
    return a.date.slice(0, 4) - b.date.slice(0, 4);
  });
  const docFrg = document.createDocumentFragment();
  data.forEach((item) => {
    let cloneTemplate = elTemplate.cloneNode(true);
    cloneTemplate.querySelector(".js-title").textContent = item.title;
    cloneTemplate.querySelector(".js-type").textContent = item.type;
    if (item.type == "expense")
      cloneTemplate.querySelector(".js-type").style.color = "#EF4444";
    else cloneTemplate.querySelector(".js-type").style.color = "#3A80F2";

    cloneTemplate.querySelector(".js-amount").textContent = item.amount;
    cloneTemplate.querySelector(".js-category").textContent = item.category;
    cloneTemplate.querySelector(".js-description").textContent =
      item.description;
    cloneTemplate.querySelector(".js-date").textContent = item.date.slice(
      0,
      10
    );
    docFrg.appendChild(cloneTemplate);
  });
  node.appendChild(docFrg);
}

function incomeFn(data) {
  let res = data.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  income.textContent = `+${res}`;
}

function expensesFn(data) {
  let res = data.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  expenses.textContent = `-${res}`;
}
