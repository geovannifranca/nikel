const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
};

document.getElementById("button-logout").addEventListener("click", logout);

document
  .getElementById("transaction-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector(
      'input[name="type-input"]:checked'
    ).value;

    data.transactions.unshift({
      value: value,
      description: description,
      date: date,
      type: type,
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();


    alert("Lançamento adicionado com sucesso.");
  });

checkLogged();

function checkLogged() {
  if (session) {
    sessionStorage.getItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
  }

  const dataUSer = localStorage.getItem(logged);
  if (dataUSer) {
    data = JSON.parse(dataUSer);
  }

  getTransactions();
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

function getTransactions() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  if (transactions.length) {
    transactions.forEach((item, i) => {
      let type = item.type === "2" ? "Saída" : "Entrada";

      transactionsHtml += `
        <tr>
          <th scope="row">${item.date}</th>
          <td>R$ ${item.value.toFixed(2)}</td>
          <td>${type}</td>
          <td>${item.description}</td>
          <td>
            <button type="button" class="btn" onclick="deleteTransaction(${i})">
              <i class="bi bi-trash text-danger"></i>
            </button>
          </td>
        </tr>
      `;
    });
  }

  document.getElementById("transactions-list").innerHTML = transactionsHtml;
}


function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function deleteTransaction(index) {
  if (!confirm("Tem certeza que deseja excluir esta transação?")) return;

  data.transactions.splice(index, 1); 
  saveData(data);

  getTransactions(); 

  alert("Transação excluída com sucesso.");
}

