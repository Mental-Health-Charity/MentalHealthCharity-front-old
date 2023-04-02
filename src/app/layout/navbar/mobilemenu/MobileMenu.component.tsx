import {  Dispatch, SetStateAction } from "react";
import styles from "./MobileMenu.module.scss"


interface MobileMenuProps {
    setIsMobileVisible: Dispatch<SetStateAction<boolean>>,
    isMobileVisible: boolean,
}

const MobileMenu = ({isMobileVisible, setIsMobileVisible}:MobileMenuProps) => {
    console.log(isMobileVisible)
    return (
        <button className={styles.mobile_menu} onClick={() => setIsMobileVisible( isMobileVisible ? false : true)}>
            <span aria-hidden="true" className="mobile_menu__deco_line"></span>
            <span aria-hidden="true" className="mobile_menu__deco_line"></span>
            <span aria-hidden="true" className="mobile_menu__deco_line"></span>
        </button>
    )
}

export default MobileMenu;
