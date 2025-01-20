import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { deleteFavoritePokemons, fetchFavoritePokemons, fetchPokemonsPhoto } from "../../../store/slices";
import { isFavorite } from "../../../utils/isFavorite.ts";

import { PokemonsCard } from "../Pokemons/PokemonsCard/PokemonsCard.tsx";

import styles from "./favoritePokemons.module.scss";

const FavoritePokemons = () => {
    const { favoritePokemons } = useAppSelector(state => state.favoritePokemons);
    const dispatch = useAppDispatch();

    const [currentName, setCurrentName] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');

    useEffect(() => {
        (async () => {
            await dispatch(deleteFavoritePokemons(currentName));
            dispatch(fetchFavoritePokemons());
        })()
    }, [currentName]);

    useEffect(() => {
        (async () => {
            const response = await dispatch(fetchPokemonsPhoto());
            const file = new File([response?.payload.data], 'image.png', { type: 'image/png' });

            setPhoto(URL.createObjectURL(file));
        })()
    }, [dispatch]);

    return (
        <div className={styles.page}>
            {favoritePokemons?.map((el, index) => (
                <PokemonsCard
                    key={index}
                    pokemon={el}
                    name={el?.name}
                    isFavorite={isFavorite(el?.name, favoritePokemons)}
                    img={photo}
                    onDeleteFavoritePokemon={setCurrentName} />
            ))}
        </div>
    )
}

export default FavoritePokemons;
