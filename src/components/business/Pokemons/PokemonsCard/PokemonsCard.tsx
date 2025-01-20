import { Box, Typography } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { IPokemonsTypes } from "../../../../types";

import styles from "./pokemonsCard.module.scss";

interface IPokemonCard {
    name: string;
    img: string;
    pokemon: IPokemonsTypes;
    isFavorite: boolean;
    addFavoritePokemon?: (pokemon: IPokemonsTypes, isFavorite: boolean) => void;
    onDeleteFavoritePokemon?: (name: string, isFavorite: boolean) => void;
}

export const PokemonsCard = ({ name, img, pokemon, isFavorite, addFavoritePokemon, onDeleteFavoritePokemon }: IPokemonCard) => {
    return (
        <Box component="section" className={styles.card}>
            <Box className={styles.card__container}>
                {img && (
                    <img src={img} alt="Pokemon" style={{ width: '100px', height: '100px' }} />
                )}
            </Box>
            <Box className={styles.card__container}>
               <Typography variant="h6">{name.toUpperCase()}</Typography>
            </Box>
            <Box className={styles.card__button}>
                {isFavorite ? (
                    <FavoriteIcon
                        className={styles.card__button_icon}
                        onClick={() => onDeleteFavoritePokemon ? onDeleteFavoritePokemon(name, false) : ''}
                    />
                ) : (
                    <FavoriteBorderIcon
                        className={styles.card__button_icon}
                        onClick={() => addFavoritePokemon ? addFavoritePokemon(pokemon, true) : ''}
                    />
                )}
            </Box>
        </Box>
    )
}
