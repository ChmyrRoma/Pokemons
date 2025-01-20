import { AnyAction, combineReducers } from '@reduxjs/toolkit';

import { IPokemons, pokemonsSlice } from './pokemons.ts';
import { IFavoritePokemons, favoritePokemonsSlice } from "./favoritePokemons.ts";

export interface StoreState {
    pokemons: IPokemons;
    favoritePokemons: IFavoritePokemons;
}

export const combinedReducers = combineReducers({
    [pokemonsSlice.name]: pokemonsSlice.reducer,
    [favoritePokemonsSlice.name]: favoritePokemonsSlice.reducer,
});

export type Store = ReturnType<typeof combinedReducers>;

const rootReducer = (state: Store, action: AnyAction) => combinedReducers(state, action);

export default rootReducer;
