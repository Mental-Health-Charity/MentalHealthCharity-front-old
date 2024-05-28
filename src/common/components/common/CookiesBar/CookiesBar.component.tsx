'use client';
import React, { useState, useEffect } from 'react';
import styles from './CookiesBar.module.scss';

const CookiesBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookiesBar}>
      <p className={styles.cookiesBar__text}>
        Strona korzysta z plików cookies w celu realizacji usług zgodnie z{' '}
        <a
          className={styles.cookiesBar__link}
          target="_blank"
          rel="noopener noreferrer"
          href="/polityka-prywatnosci-i-cookies.pdf"
        >
          polityką prywatności
        </a>{' '}
        oraz{' '}
        <a
          className={styles.cookiesBar__link}
          target="_blank"
          rel="noopener noreferrer"
          href="/regulamin"
        >
          regulaminem serwisu
        </a>
        .
      </p>
      <button className={styles.cookiesBar__button} onClick={handleAccept}>
        Rozumiem!
      </button>
    </div>
  );
};

export default CookiesBar;
