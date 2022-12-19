let addToy = false;

const toyContainer = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.add-toy-form')
const url = 'http://localhost:3000/toys'
const fetchAll = () => {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    data.forEach(character => {
      addToyCard(character)
    })
  })
}

const addToyCard = (character) => {
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let button = document.createElement('button')

  div.classList.add('card')
  h2.innerText = character.name

  img.src = character.image
  img.classList.add('toy-avatar')

  p.innerText = `${character.likes} Likes`

  button.innerText = `Like ❤️`
  button.id = `${character.id}`
  button.classList.add('like-btn')

  button.addEventListener('click', (e) => {
    onButtonClick(e)
  })

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)

  toyContainer.appendChild(div)

}

const onFormSubmit = (e) => {
  e.preventDefault()
  let formData = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    addToyCard(data)
  })

}
const onButtonClick = (e) => {

  fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: numLikes
    })
  })
  .then(res => res.json())
  then(data => {
    let id = e.target.id
    let target = e.target.previousElementSibling
    let numLikes = parseInt(target.innerText.split(' ')[0]) + 1
    target.innerText = `${numLikes} Likes`
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchAll()
  toyForm.addEventListener('submit', onFormSubmit)
});
























