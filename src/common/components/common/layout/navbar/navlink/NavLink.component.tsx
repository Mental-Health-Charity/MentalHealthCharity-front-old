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
    <Link className={styles.navLink} href={href}>
      {name}
      {renderDot()}
      <span className={styles.navLink_dot}></span>
    </Link>
  );
};

export default NavLink;
