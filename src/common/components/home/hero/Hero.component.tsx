'use client';
import Link from 'next/link';
import styles from './Hero.module.scss';
import DefaultButton from '@/common/components/common/defaultbutton/DefaultButton.component';
import Image from 'next/image';
import FacebookIcon from '../../../images/static/facebook.png';
import InstagramIcon from '../../../images/static/instagram.png';
import ScrollDownIcon from '../../../images/gif/scrolldown.gif';
import Floating from '../../common/floating/Floating.component';
import buoyIcon from '../../../images/gif/buoy.gif';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Roles from '@/utils/roles';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className={styles.hero}>
      <main className={styles.hero__main}>
        <h1 className={styles.hero__heading}>Fundacja Peryskop</h1>
        <h2>Przybywam w celu:</h2>
        <div className={styles.hero__buttons_wrapper}>
          {user?.user_role === Roles.user && (
            <DefaultButton
              fontSize="fmedium"
              fillType="yellow"
              content="Uzyskania pomocy"
              href="/panelPodopiecznego"
            />
          )}
          {!user && (
            <DefaultButton
              fontSize="fmedium"
              fillType="yellow"
              content="Uzyskania pomocy"
              href="/panelPodopiecznego"
            />
          )}
          {user?.user_role === Roles.admin && (
            <DefaultButton
              fontSize="fmedium"
              fillType="navy"
              content="Administracji"
              href="/admin"
            />
          )}
          <DefaultButton
            fontSize="fmedium"
            fillType="white"
            content="Niesienia pomocy"
            href="/panelWolontariusza"
          />
        </div>
        <Image
          className={styles.hero__main__scrollicon}
          width="30"
          loading="lazy"
          src={ScrollDownIcon}
          alt="scroll icon"
        />
      </main>
      <div className={styles.hero__social}>
        <Link target="blank" rel="noopener" href="https://facebook.pl/">
          <Image width={32} src={FacebookIcon} alt="facebook icon" />
        </Link>
        <Link target="blank" rel="noopener" href="https://instagram.pl/">
          <Image width={32} src={InstagramIcon} alt="instagram icon" />
        </Link>
      </div>
      <Floating offsetLeft={10} offsetTop={90} icon={buoyIcon} />
    </section>
  );
};

export default Hero;
