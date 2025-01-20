import { Route, Routes } from "react-router-dom";

import { FavoritePokemonsPage } from "./pages/FavoritePokemonsPage.tsx";
import { PokemonsPage } from "./pages/PokemonsPage.tsx";
import GlobalLayout from "./layout/GlobalLayout.tsx";
import { HeaderPage } from "./pages/HeaderPage.tsx";

const App = () => {
    return (
        <>
            <HeaderPage />
            <Routes>
                <Route element={<GlobalLayout />}>
                    <Route path="/" element={<PokemonsPage />} />
                    <Route path="/favorite" element={<FavoritePokemonsPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
