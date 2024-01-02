'use client';
import Image from 'next/image';
import Link from 'next/link';
import InstagramLogo from '../../../../images/static/instagram.png';
import FacebookLogo from '../../../../images/static/facebook.png';
import styles from './Footer.module.scss';
import LogoLight from '../../../../images/static/logoLight.png';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__block}>
        <li>
          <button className={styles.footer__block__item}>O nas</button>
        </li>
        <li>
          <Link
            className={styles.footer__block__item}
            href="/przydatne-materialy"
          >
            Przydatne materiały
          </Link>
        </li>
        <li>
          <Link className={styles.footer__block__item} href="/kontakt">
            Kontakt
          </Link>
        </li>
      </ul>
      <div className={styles.footer__block}>
        <Image width={200} src={LogoLight} alt="Logo" />
      </div>
      <ul className={styles.footer__block}>
        <li>
          <Link
            className={styles.footer__block__item}
            target="_blank"
            rel="noopener"
            href="https://instagram.com"
          >
            <Image width={32} src={InstagramLogo} alt="Instagram icon" />
            FundacjaPeryskop
          </Link>
        </li>
        <li>
          <Link
            className={styles.footer__block__item}
            target="_blank"
            rel="noopener"
            href="https://facebook.com"
          >
            <Image width={32} src={FacebookLogo} alt="Facebook icon" />
            FundacjaPeryskop
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
