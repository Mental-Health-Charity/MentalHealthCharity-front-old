import { Dispatch, SetStateAction } from 'react';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  setIsMobileVisible: Dispatch<SetStateAction<boolean>>;
  isMobileVisible: boolean;
}

const MobileMenu = ({
  isMobileVisible,
  setIsMobileVisible,
}: MobileMenuProps) => {
  return (
    <button
      className={styles.mobile_menu}
      id="navigation"
      name="Nawigacja"
      aria-labelledby="Nawigacja"
      aria-label="Nawigacja"
      onClick={() => setIsMobileVisible(isMobileVisible ? false : true)}
    >
      <span aria-hidden="true" className={styles.mobile_menu__deco_line}></span>
      <span aria-hidden="true" className={styles.mobile_menu__deco_line}></span>
      <span aria-hidden="true" className={styles.mobile_menu__deco_line}></span>
    </button>
  );
};

export default MobileMenu;
