import { Dispatch, SetStateAction } from "react";
import StyledMobileMenu from "./MobileMenu.style";

interface MobileMenuProps {
    setIsMobileVisible: Dispatch<SetStateAction<boolean>>,
    isMobileVisible: boolean,
}

const MobileMenu = ({setIsMobileVisible, isMobileVisible}:MobileMenuProps) => {

    return (
        <StyledMobileMenu onClick={() => setIsMobileVisible( isMobileVisible ? false : true)}>
            <span aria-hidden="true" className="hamburger_deco_line"></span>
            <span aria-hidden="true" className="hamburger_deco_line"></span>
            <span aria-hidden="true" className="hamburger_deco_line"></span>
        </StyledMobileMenu>
    )
}

export default MobileMenu;
