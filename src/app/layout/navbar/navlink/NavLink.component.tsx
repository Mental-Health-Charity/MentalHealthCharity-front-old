import { usePathname } from "next/navigation";
import StyledNavLink from "./NavLink.style";

interface NavLinkProps {
    href: string,
    name: string,
}

const NavLink = ({href, name}: NavLinkProps) => {

    const route = usePathname();
    
    return (
        <StyledNavLink isActive={route === href}  href={href}>
            {name}
        </StyledNavLink>
    )
}

export default NavLink;