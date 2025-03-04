const getPokemon = async (event) => {
  try {
      event.preventDefault();
      
      // Generate a random Pokémon ID (1 to 1025, covering most known Pokémon)
      let randomId = Math.floor(Math.random() * 1025) + 1;
      
      // Fetch random Pokémon data using the assigned random ID
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      let responseData = await response.json();
      
      let name = document.getElementById("pokemonName");
      let img = document.getElementById("pokemonImg");
      name.innerText = responseData.name.toUpperCase();
      img.src = responseData.sprites.front_default;
      
      // Get the first type of the random Pokémon
      let primaryType = responseData.types[0].type.name;
      
      // Fetch Pokémon with the same type
      let typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${primaryType}`);
      let typeData = await typeResponse.json();
      
      let similarPokemon = typeData.pokemon
          .map(p => p.pokemon.url)
          .filter(url => !url.includes(`/pokemon/${randomId}/`)) // Exclude the original
          .sort(() => 0.5 - Math.random()) // Shuffle
          .slice(0, 5); // Pick 5 random ones
      
      let container = document.getElementById("pokemonContainer");
      container.innerHTML = ""; // Clear previous results
      
      // Fetch and display the 5 similar Pokémon
      for (let url of similarPokemon) {
          let res = await fetch(url);
          let data = await res.json();
          
          let pokeImg = document.createElement("img");
          pokeImg.src = data.sprites.front_default;
          pokeImg.alt = data.name;
          pokeImg.title = data.name.toUpperCase();
          
          container.appendChild(pokeImg);
      }
  } catch (err) {
      console.log(err.message);
  }
};
