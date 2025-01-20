import { createSlice } from "@reduxjs/toolkit";

import { IPokemonsTypes } from "../../types";

export interface IFavoritePokemons {
    favoritePokemons: IPokemonsTypes[];
    isLoading: boolean;
    isFavorite: boolean;
}

const initialState = {
    favoritePokemons: [],
    isLoading: true,
    isFavorite: false,
} as unknown as IFavoritePokemons;

export const favoritePokemonsSlice = createSlice({
    name: 'favoritePokemons',
    initialState,
    reducers: {
        getFavoritePokemons: (state, action) => {
            state.favoritePokemons = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setFavorite: (state, action) => {
            state.isFavorite = action.payload;
        },
    },
});

export const favoritePokemonsSliceActions = favoritePokemonsSlice.actions;
