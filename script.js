const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const form = document.getElementById('form');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() && amount.value.trim()) {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  } else {
    alert('Text and Amount are mandatory fields');
  }
}

//Generate random ID
function generateId() {
  return Math.floor(Math.random() * 1000000000);
}

//Add transactions to the DOM
function addTransactionDOM(transaction) {
  //Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `${transaction.text} <span>${transaction.amount}</span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item);
}

//Update the balance income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, amount) => acc + amount, 0).toFixed(2);

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, income) => acc + income, 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter(amount => amount < 0)
      .reduce((acc, expense) => acc + expense, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

//Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
