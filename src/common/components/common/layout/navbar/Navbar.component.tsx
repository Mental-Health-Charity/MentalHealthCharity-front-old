'use client';
import Image from 'next/image';
import Logo from '../../../../images/static/logo.png';
import DefaultButton from '@/common/components/common/defaultbutton/DefaultButton.component';
import { menuRoutes } from '@/utils/routes';
import NavLink from '../navLink/NavLink.component';
import MobileMenu from '../mobileMenu/MobileMenu.component';
import { useState } from 'react';
import styles from './Navbar.module.scss';
import clsx from 'clsx';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Link from 'next/link';
import Roles from '@/utils/roles';
import DefaultUserImg from '../../../../images/static/user.png';
import DropDownIcon from '../../../../images/static/dropdown-1.svg';

const Navbar = () => {
  const [isMobileVisible, setIsMobileVisible] = useState(true);
  const { user } = useAuth();
  return (
    <nav
      className={clsx(styles.navbar, {
        [styles['navbar--unrolled']]: isMobileVisible,
      })}
    >
      <div className={styles.navbar__logoWrapper}>
        <Link className={styles.navbar__authWrapper__loggedUser} href={'/'}>
          <Image
            className={styles.navbar__logo}
            priority
            alt="Logotype"
            src={Logo}
            width={'200'}
          />
        </Link>
        <MobileMenu
          setIsMobileVisible={setIsMobileVisible}
          isMobileVisible={isMobileVisible}
        />
      </div>
      <ul className={styles.navbar__buttonsWrapper}>
        {menuRoutes.map((item, idx) => (
          <NavLink name={item.name} key={idx} href={item.href} />
        ))}
        {user && user.user_role !== Roles.user && (
          <NavLink name="Profil" href={`/profil/${user.id}`} />
        )}
        {user && (
          <NavLink
            name="Czaty"
            href={
              user.user_role === Roles.user
                ? `/panelPodopiecznego`
                : `/panelWolontariusza/czaty`
            }
          />
        )}
      </ul>
      <div className={styles.navbar__authWrapper}>
        {user ? (
          <Link
            className={styles.navbar__authWrapper__loggedUser}
            href={'/login'}
          >
            <Image
              src={user.avatar_url || DefaultUserImg}
              width={45}
              className={styles.navbar__authWrapper__loggedUser__avatar}
              height={45}
              alt="zdjęcie profilowe użytkownika"
            />
            {user.full_name === '' ? 'Anonim' : user.full_name}
            <Image
              src={DropDownIcon}
              width={45}
              className={styles.navbar__authWrapper__loggedUser__dropDown}
              height={45}
              alt="zdjęcie profilowe użytkownika"
            />
          </Link>
        ) : (
          <>
            <DefaultButton
              fillType={'white'}
              content={'Zaloguj'}
              href={'/login'}
              fontSize={'fsmall'}
            />
            <DefaultButton
              fillType={'yellow'}
              content={'Zarejestruj'}
              href={'/signIn'}
              fontSize={'fsmall'}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
