import { usePathname } from "next/navigation";
import styles from "./NavLink.module.scss"
import Link from "next/link";

interface NavLinkProps {
    href: string,
    name: string,
}

const NavLink = ({href, name}: NavLinkProps) => {

    const route = usePathname();
    const renderDot = () => {
        if(route === href) {
            return(<span aria-hidden={true} className={styles.nav_link__dot}></span>)
        }
    }
    return (
        <Link className={styles.nav_link} href={href}>
            {name}
            {renderDot()}
            <span className={styles.nav_link_dot}></span>
        </Link>
    )
}

export default NavLink;