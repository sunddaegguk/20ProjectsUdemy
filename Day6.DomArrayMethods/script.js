const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillinairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1100000),
  };

  addData(newUser);
}
//Double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
//Filter only millionaires
function showMillinaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}
//reduce wealth calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

//Add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}
//Update DOM

function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  for (i = 0; i < providedData.length; i++) {
    providedData[i];
  }

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event listeners
//add user
addUserBtn.addEventListener('click', getRandomUser);
//doble money
doubleBtn.addEventListener('click', doubleMoney);
//sort list
sortBtn.addEventListener('click', sortByRichest);
//filter mollionaire
showMillinairesBtn.addEventListener('click', showMillinaires);
//reduce wealth
calculateWealthBtn.addEventListener('click', calculateWealth);
