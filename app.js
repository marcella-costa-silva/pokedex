window.addEventListener('load', () => {
  const pokedex = document.querySelector('#pokedex')
  fetchPokemon()
})

const fetchPokemon = () => {
  const promises = []

  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push(fetch(url).then(res => res.json()))
  }

  Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
      id: data.id,
      name: data.name,
      image: data.sprites['front_default'],
      type: data.types.map(type => type.type.name).join(', ')
    }))

    displayPokemon(pokemon)
  })
}

const displayPokemon = (pokemon) => {
  console.log(pokemon)

  const pokemonHTMLString = pokemon.map(infoPokemon => `
    <li class="card">
      <img class="card-image" src="${infoPokemon.image}" alt="${infoPokemon.name}" />
      <h2 class="card-title ">${infoPokemon.id}. ${infoPokemon.name}</h2>
      <p class="card-subtitle">Type: ${infoPokemon.type}</p>
    </li>
  `).join('')

  pokedex.innerHTML = pokemonHTMLString
}
