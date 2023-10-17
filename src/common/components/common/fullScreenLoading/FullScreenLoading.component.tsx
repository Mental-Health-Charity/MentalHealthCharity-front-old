import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';
import styles from './FullScreenLoading.module.scss';

const FullScreenLoading = () => {
  return (
    <div className={styles.loading}>
      <Image alt="ikona ładowania" src={LoadingIcon} width={64} height={64} />
      <p>Trwa ładownie...</p>
    </div>
  );
};

export default FullScreenLoading;
