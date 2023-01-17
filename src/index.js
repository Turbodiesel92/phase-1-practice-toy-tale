let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(toyData => renderToys(toyData))

function renderToys(toys){

  toys.forEach((toy) => {
    const toyCollection = document.querySelector('#toy-collection')
    const card = document.createElement('div')
    card.className = 'card'

    const h2 = document.createElement('h2')
    h2.textContent = toy.name

    const image = document.createElement('img')
    image.src = toy.image
    image.className = 'toy-avatar'

    const p = document.createElement('p')
    p.textContent = toy.likes

    const button = document.createElement('button')
    button.className = 'like-btn'
    button.id = toy.id
    button.textContent = 'like'

    button.addEventListener('click', () => {
      p.textContent = parseInt(p.textContent) + 1

      fetch(`http://localhost:3000/toys/${toy.id}`, {
      method:'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        likes: parseInt(p.textContent)
      })
    })

    .then(response => response.json())
    .then(toyObj => console.log([toyObj]))
  })
    card.append(h2, image, button, p)
    toyCollection.appendChild(card)
  })
}
function handleNewToy() {
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const nameInput = event.target.name.value
    const imageInput = event.target.image.value

    const newObj = {
      name: nameInput,
      image: imageInput,
      likes: 0
    }

    // renderToys([newObj])

    fetch('http://localhost:3000/toys', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newObj)
    })

    .then(response => response.json())
    .then(toyObj => renderToys([toyObj]))
  })
}

handleNewToy()


