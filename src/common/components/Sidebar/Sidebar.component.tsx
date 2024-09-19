'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { MdDashboard } from 'react-icons/md';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import { FaUsersCog } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { IoMdLogOut } from 'react-icons/io';

const Sidebar = () => {
  const { pathname } = useRouter();

  const handleLogout = () => {
    // Implementacja funkcji wylogowania
    console.log('User logged out');
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo or Title */}
      <div className={styles.sidebar__header}>
        <h2 className={styles.sidebar__title}>Admin Panel</h2>
      </div>

      {/* Navigation Links */}
      <nav className={styles.sidebar__nav}>
        <ul className={styles.sidebar__list}>
          <li
            className={`${styles.sidebar__item} ${
              pathname === '/admin/dashboard' ? styles.active : ''
            }`}
          >
            <Link href="/admin/dashboard" className={styles.sidebar__link}>
              <MdDashboard />
              <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={`${styles.sidebar__item} ${
              pathname === '/admin/chats' ? styles.active : ''
            }`}
          >
            <Link href="/admin/chats" className={styles.sidebar__link}>
              <BsChatSquareDotsFill />
              <span>Chats</span>
            </Link>
          </li>
          <li
            className={`${styles.sidebar__item} ${
              pathname === '/admin/users' ? styles.active : ''
            }`}
          >
            <Link href="/admin/users" className={styles.sidebar__link}>
              <FaUsersCog />
              <span>Users</span>
            </Link>
          </li>
          <li
            className={`${styles.sidebar__item} ${
              pathname === '/admin/settings' ? styles.active : ''
            }`}
          >
            <Link href="/admin/settings" className={styles.sidebar__link}>
              <IoIosSettings />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className={styles.sidebar__footer}>
        <button className={styles.sidebar__logout} onClick={handleLogout}>
          <IoMdLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
