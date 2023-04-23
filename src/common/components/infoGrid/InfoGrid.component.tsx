import Image from 'next/image';
import styles from './InfoGrid.module.scss';
import ExampleImage from '../../images/static/mhimg.png';
import ExampleImage2 from '../../images/static/mhimg2.png';

const InfoGrid = () => {
  return (
    <section className={styles['info-grid']}>
      <h2 className={styles['info-grid__heading']}>Jak to działa?</h2>
      <div className={styles['info-grid__blocks-wrapper']}>
        <article className={styles['info-grid__blocks-wrapper__block']}>
          <Image
            className={styles['info-grid__blocks-wrapper__block__image']}
            src={ExampleImage}
            alt={''}
          />
          <p>Lorem ipsum, lorem lorem</p>
        </article>
        <article className={styles['info-grid__blocks-wrapper__block']}>
          <Image
            className={styles['info-grid__blocks-wrapper__block__image']}
            src={ExampleImage2}
            alt={''}
          />
          <p>Ipsum, ipsum lorem, lorem</p>
        </article>
        <article className={styles['info-grid__blocks-wrapper__block']}>
          <Image
            className={styles['info-grid__blocks-wrapper__block__image']}
            src={ExampleImage}
            alt={''}
          />
          <p>Lorem ipsum, ipsum ipsum</p>
        </article>
      </div>
    </section>
  );
};

export default InfoGrid;
