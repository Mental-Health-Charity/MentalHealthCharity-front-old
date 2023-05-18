import Floating from '../../common/floating/Floating.component';
import styles from './MenteeHero.module.scss';
import blob1 from '../../../images/static/blobs/blob.svg';
import blob2 from '../../../images/static/blobs/blob2.svg';

const MenteeHero = () => {
  return (
    <section className={styles.menteeHero}>
      <div className={styles.menteeHero__content}>
        <Floating offsetLeft={1} offsetTop={1} icon={blob1} />
        <h1 className={styles.menteeHero__content__heading}>
          Witaj w panelu podopiecznego.
        </h1>
        <p className={styles.menteeHero__content__desc}>
          W tym panelu możesz skontaktować się z dopasowanym wolontariuszem
          zupełnie za darmo! Zgłoś się w formularzu poniżej, a już niedługo
          zostanie przydzielony Ci wolontariusz z którym będziesz mógł pisać na
          chacie!
        </p>
        <Floating offsetLeft={100} offsetTop={70} icon={blob2} />
      </div>
    </section>
  );
};

export default MenteeHero;
