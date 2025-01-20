import axios from "axios";

export interface IFetchPokemonsDto {
    limit: number;
    offset: number;
}

const getPokemons = async ({offset = 1, limit = 10}: IFetchPokemonsDto) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(data => data)
}

const getPokemonsPhoto = async () => {
    return axios.get(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
        { responseType: 'blob' }
    )
}

export const api = { getPokemons, getPokemonsPhoto }
