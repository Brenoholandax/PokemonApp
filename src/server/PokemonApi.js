async function BuscarPokemonRandom() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 100),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  //return response.json();
}
