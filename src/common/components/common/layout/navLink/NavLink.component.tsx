import { usePathname } from 'next/navigation';
import styles from './NavLink.module.scss';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  name: string;
}

const NavLink = ({ href, name }: NavLinkProps) => {
  const route = usePathname();
  const renderDot = () => {
    if (route === href) {
      return <span aria-hidden={true} className={styles.navLink__dot}></span>;
    }
  };
  return (
    <li className={styles.navLink}>
      <Link className={styles.navLink} href={href}>
        {name}
        {renderDot()}
        <span className={styles.navLink_dot}></span>
      </Link>
    </li>
  );
};

export default NavLink;
