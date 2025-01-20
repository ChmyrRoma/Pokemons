import { IPokemonsTypes } from "../types";

export const isFavorite = (pokemonName: string, favoritePokemons: IPokemonsTypes[]): boolean => {
    return favoritePokemons.some(pokemon => pokemon.name === pokemonName);
};
