var pagenum = 1;

document.addEventListener('DOMContentLoaded', function(e) {
  fetchMonsters(pagenum);
  createForm();
});

const backButton = document.getElementById('back');
const fwButton = document.getElementById('forward');
backButton.addEventListener('click', function(e) {
  pagenum -= 1
  fetchMonsters(pagenum)
});
fwButton.addEventListener('click', function(e) {
  pagenum += 1
  fetchMonsters(pagenum)
});

function fetchMonsters(num) {
  console.log(num)

  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
  .then(resp => resp.json())
  .then(json => renderMonsters(json))
}

function renderMonsters(data) {
  const div = document.getElementById('monster-container');
  let ul = document.createElement('ul');
  div.innerHTML = "";

    data.forEach(monster => {
      const li = document.createElement('li');
      li.innerText = monster.name;
      ul.appendChild(li);
    });

  div.appendChild(ul);
}

function createForm() {
  const div = document.getElementById('create-monster');
  const form = document.getElementById('form')
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    createMonster(e);
  })
}

function createMonster(e) {
  let name = e.target.name.value;
  let age = e.target.age.value;
  let description = e.target.description.value;
  e.target.name.value = "";
  e.target.age.value = "";
  e.target.description.value = "";

  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    })
  }
  fetch('http://localhost:3000/monsters', configObj)
  .then(resp => resp.json())
  .then(json => console.log(json))
}
