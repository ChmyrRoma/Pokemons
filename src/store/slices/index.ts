import { createAsyncThunk } from "@reduxjs/toolkit";

import { pokemonsSliceActions } from "../reducers/pokemons";
import { favoritePokemonsSliceActions } from "../reducers/favoritePokemons.ts";
import { api, IFetchPokemonsDto } from "../rest/api";
import { IPokemonsTypes } from "../../types";

export const fetchPokemons = createAsyncThunk<IFetchPokemonsDto>(
    'pokemons/fetchPokemons',
    async (params: IFetchPokemonsDto, thunkAPI) => {
    const response = await api.getPokemons(params);

    if (response) {
        thunkAPI.dispatch(pokemonsSliceActions.getPokemons(response.data.results));
    }
    return response.data;
});

export const addFavoritePokemons = createAsyncThunk(
    'pokemons/addFavoritePokemons',
    async (data: IPokemonsTypes | object[]) => {
        const currentFavorites = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');

        const newFavorites = Array.isArray(data)
            ? [...currentFavorites, ...data.filter((pokemon) => !currentFavorites.some((item: IPokemonsTypes) => item.name === pokemon?.name))]
            : currentFavorites.some((item: IPokemonsTypes) => item.name === data.name)
                ? currentFavorites
                : [...currentFavorites, data];

        localStorage.setItem('favoritePokemons', JSON.stringify(newFavorites));

        return newFavorites;
    }
);

export const deleteFavoritePokemons = createAsyncThunk(
    'pokemons/deleteFavoritePokemons',
    async (name: string) => {
        const storedPokemons = localStorage.getItem('favoritePokemons');
        if (storedPokemons) {
            const pokemons: IPokemonsTypes[] = JSON.parse(storedPokemons);
            const updatedPokemons = pokemons.filter((pokemon) => pokemon.name !== name);
            localStorage.setItem('favoritePokemons', JSON.stringify(updatedPokemons));
        }
    });

export const fetchFavoritePokemons = createAsyncThunk(
    'pokemons/fetchFavoritePokemons',
    async (_, thunkAPI) => {
        const response = await JSON.parse(localStorage.getItem('favoritePokemons') || '');

        if (response) {
            thunkAPI.dispatch(favoritePokemonsSliceActions.getFavoritePokemons(response));
        }
        return response;
    });

export const fetchPokemonsPhoto = createAsyncThunk(
    'pokemons/fetchPokemonsPhoto',
    async () => {
       return await api.getPokemonsPhoto();
    });
