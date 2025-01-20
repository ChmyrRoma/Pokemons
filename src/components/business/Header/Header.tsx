import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import styles from "./header.module.scss";

interface ILinks {
    name: string;
    link: string;
}

const links: ILinks[] = [
    { name: 'Pokemons', link: '/' },
    { name: 'Favorite Pokemons', link: 'favorite' }
];

const Header = () => {
    return (
        <Box className={styles.header}>
            {links.map((el, index) => (
                <NavLink
                    key={index}
                    to={el.link}
                    className={({ isActive, isPending }) =>
                        `${styles.header__link} ${isPending ? styles.header__link_noActive : isActive ? styles.header__link_active : ""}`
                    }
                >
                    <Typography variant="h6">{el.name}</Typography>
                </NavLink>
            ))}
        </Box>
    )
}

export default Header;
