import { createSlice } from "@reduxjs/toolkit";

import { IPokemonsTypes } from "../../types";

export interface IPokemons {
    pokemons: IPokemonsTypes[];
    isLoading: boolean;
    page: number;
}

const initialState = {
    pokemons: [],
    isLoading: true,
    page: 1,
} as unknown as IPokemons;

export const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        getPokemons: (state, action) => {
            state.pokemons = [...state.pokemons, ...action.payload];
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const pokemonsSliceActions = pokemonsSlice.actions;
