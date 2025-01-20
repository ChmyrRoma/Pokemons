import { Outlet } from "react-router-dom";

import styles from "./globalLayout.module.scss"

const GlobalLayout = () => {
    return (
        <div className={styles.layout}>
            <Outlet />
        </div>
    )
}

export default GlobalLayout;
