import StyledNavbar from "./Navbar.style"
import Image from "next/image";
import Logo from "../../../common/images/static/logo.png"
import DefaultButton from "@/common/components/defaultbutton/DefaultButton.component";
import menuRoutes from "./service";
import NavLink from "./navlink/NavLink.component";
import MobileMenu from "./mobilemenu/MobileMenu.component";
import { useEffect, useState } from "react";

const Navbar = () => {

    const [isMobileVisible, setIsMobileVisible] = useState(true);
    console.log(isMobileVisible)
    return (
        <StyledNavbar isMobileVisible={isMobileVisible}>
            <div className="logo_wrapper">
                <Image className="nav_logo" priority alt="Logotype" src={Logo} width={"200"} />
                <MobileMenu setIsMobileVisible={setIsMobileVisible} isMobileVisible={isMobileVisible} />
            </div>
            <ul className="nav_btns_wrapper">
                {
                    menuRoutes.map((item, idx) =>
                        <NavLink
                            name={item.name}
                            key={idx}
                            href={item.href}
                        />)
                }
            </ul>
            <div className="nav_auth_wrapper">
                <DefaultButton
                    service={() => console.log("elo")}
                    isFilled={false}
                    content={"Zaloguj"} />
                <DefaultButton
                    service={() => console.log("e123lo")}
                    isFilled={true}
                    content={"Zarejestruj"} />
            </div>
        </StyledNavbar>
    )
}

export default Navbar;