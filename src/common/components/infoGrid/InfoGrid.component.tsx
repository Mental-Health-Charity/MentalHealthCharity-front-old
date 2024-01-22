import Image from 'next/image';
import styles from './InfoGrid.module.scss';
import VolunteerImg from '../../images/static/wolo.png';
import MenteeImg from '../../images/static/podopieczni.png';
import KnowledgeImg from '../../images/static/bazaWiedzy.png';
import Floating from '../common/floating/Floating.component';
import SeaWeedIcon from '../../images/gif/seaweed.gif';
import ShellIcon from '../../images/gif/shell.gif';

const InfoGrid = () => {
  return (
    <section className={styles.infoGrid}>
      <h2 className={styles.infoGrid__heading}>Jak to działa?</h2>
      <div className={styles.infoGrid__blocksWrapper}>
        <article className={styles.infoGrid__blocksWrapper__block}>
          <Image
            className={styles.infoGrid__blocksWrapper__block__image}
            src={VolunteerImg}
            alt={'Grafika zdrowie psychiczne'}
            width={200}
            height={200}
          />
          <p>
            Szkolimy wolontariuszy, oraz pomagamy im rozwijać się w obszarze
            niesienia pomocy psychologicznej
          </p>
        </article>
        <article className={styles.infoGrid__blocksWrapper__block}>
          <Image
            className={styles.infoGrid__blocksWrapper__block__image}
            src={MenteeImg}
            alt={'Grafika zdrowie psychiczne'}
            width={200}
            height={200}
          />
          <p>
            Oferujemy osobom w kryzysie darmowe wsparcie pełne uwagi i empatii,
            bez oceny
          </p>
        </article>
        <article className={styles.infoGrid__blocksWrapper__block}>
          <Image
            className={styles.infoGrid__blocksWrapper__block__image}
            src={KnowledgeImg}
            alt={'Grafika zdrowie psychiczne'}
            width={200}
            height={200}
          />
          <p>
            Tworzymy bazę wiedzy przy współpracy ze specjalistami dla tych,
            którzy lubią wiedzieć więcej
          </p>
        </article>
      </div>
      <Floating offsetLeft={68} offsetTop={102} icon={SeaWeedIcon} />
      <Floating offsetLeft={26} offsetTop={110} icon={ShellIcon} />
    </section>
  );
};

export default InfoGrid;
