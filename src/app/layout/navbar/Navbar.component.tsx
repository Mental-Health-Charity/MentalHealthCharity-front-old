import StyledNavbar from "./Navbar.style"
import Image from "next/image";
import Logo from "../../../common/images/static/logo.png"
import DefaultButton from "@/common/components/defaultbutton/DefaultButton.component";
import Link from "next/link";
import menuRoutes from "./service";
import { usePathname } from 'next/navigation';
import NavLink from "./navlink/NavLink.component";

const Navbar = () => {

    const route = usePathname();

    return (
        <StyledNavbar>
            <Image priority alt="Logotype" src={Logo} width={"200"} />
            <div className="nav_btns_wrapper">
                {
                    menuRoutes.map((item) =>
                        <NavLink
                            name={item.name}
                            key={item.href}
                            href={item.href}
                        />)
                }
            </div>
            <div className="nav_auth_wrapper">
                <DefaultButton
                    service={() => console.log("elo")}
                    isFilled={false}
                    content={"Zaloguj sie"} />
                <DefaultButton
                    service={() => console.log("e123lo")}
                    isFilled={true}
                    content={"Zarejestruj sie"} />
            </div>
        </StyledNavbar>
    )
}

export default Navbar;