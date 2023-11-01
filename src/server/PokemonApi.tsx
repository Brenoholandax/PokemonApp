class PokemonApi {
  jsonString: string;
  constructor() {
    this.jsonString = "{}";
  }
  public async buscarPokemonRandom() {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 1017),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    return response;
  }

  public async buscarPokemonIdOuNome(valor: string | null | undefined) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + valor, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  }
}

export default PokemonApi;
