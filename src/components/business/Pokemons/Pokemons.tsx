import { useEffect, useState, useRef, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { addFavoritePokemons, fetchPokemons, fetchPokemonsPhoto } from "../../../store/slices";
import { IPokemonsTypes } from "../../../types";
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.tsx';

import { PokemonsCard } from "./PokemonsCard/PokemonsCard.tsx";

import styles from "./pokemons.module.scss";

const Pokemons = () => {
    const dispatch = useAppDispatch();
    const { pokemons } = useAppSelector(state => state.pokemons);
    const { favoritePokemons } = useAppSelector(state => state.favoritePokemons);

    const [currentPokemon, setCurrentPokemon] = useState<object[] | IPokemonsTypes>(
        (() => {
            try {
                const storedData = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');
                if (Array.isArray(storedData)) {
                    return storedData;
                } else if (typeof storedData === 'object' && storedData !== null) {
                    return storedData as IPokemonsTypes;
                }
                return [];
            } catch {
                return [];
            }
        })()
    );
    const [photo, setPhoto] = useState<string>('');
    const [isHasMore, setIsHasMore] = useState<boolean>(true);
    const [next, setNext] = useState<string>('');
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

    const lastElementRef = useRef<HTMLDivElement | null>(null);

    const getParamsFromNext = (url: string) => {
        const params = new URLSearchParams(url.split('?')[1]);
        const offset = params.get('offset');
        const limit = params.get('limit');
        return { offset: offset || 1, limit: limit || 100 }
    }

    const handleGetPokemons = useCallback(async () => {
            const { offset, limit } = getParamsFromNext(next)
            const response = await dispatch(fetchPokemons({ offset, limit }));
            if (response.payload) {
                setIsHasMore(!!response?.payload?.next);
                setNext(response.payload.next);
            }
        }, [next])

    useEffect(() => {
        (async () => {
            await handleGetPokemons();
            setIsFirstLoad(false);
        })()
    }, []);

    const { isFetching } = useInfiniteScroll({ loadMore: handleGetPokemons, hasMore: isHasMore, threshold: 1.0, isSkip: isFirstLoad });

    useEffect(() => {
        dispatch(addFavoritePokemons(currentPokemon));
    }, [currentPokemon]);

    useEffect(() => {
        (async () => {
            const response = await dispatch(fetchPokemonsPhoto());
            const file = new File([response?.payload.data], 'image.png', { type: 'image/png' });

            setPhoto(URL.createObjectURL(file));
        })()
    }, [dispatch]);

    const isFavorite = useCallback((pokemonName: string) => {
        const favorites = JSON.parse(localStorage.getItem('favoritePokemons') || '[]') || favoritePokemons;
        return favorites.some((pokemon: IPokemonsTypes) => pokemon.name === pokemonName);
    }, [favoritePokemons]);

    const addFavoritePokemon = (el: IPokemonsTypes) => {
        setCurrentPokemon([...currentPokemon, el]);
    };

    if (!pokemons) return null;

    return (
        <div className={styles.page} ref={lastElementRef}>
            <div className={styles.page__list}>
                {pokemons.map((el: IPokemonsTypes, index: number) => (
                    <PokemonsCard
                        key={index}
                        pokemon={el}
                        name={el.name}
                        isFavorite={isFavorite(el.name)}
                        img={photo}
                        addFavoritePokemon={addFavoritePokemon}
                    />
                ))}
            </div>
            { !isFetching && <div className={styles.page__loader}>Loading...</div> }
        </div>
    );
};

export default Pokemons;
