import styles from './CMS.module.scss';

const CMS = () => {
  return (
    <div className={styles.cmsWrapper}>
      <form className={styles.cmsWrapper__editor}>
        <legend className={styles.cmsWrapper__editor__legend}>
          Kreator artykułów
        </legend>
        <p className={styles.cmsWrapper__editor__row}>
          <label
            className={styles.cmsWrapper__editor__row__label}
            htmlFor="articleTitle"
          >
            Tytuł:
          </label>
          <input
            className={styles.cmsWrapper__editor__row__input}
            id="articleTitle"
            type="text"
            placeholder="Mój artykuł"
          />
        </p>
        <p className={styles.cmsWrapper__editor__row}>
          <label
            className={styles.cmsWrapper__editor__row__label}
            htmlFor="articleContent"
          >
            Treść:
          </label>
          <textarea
            className={styles.cmsWrapper__editor__row__textarea}
            id="articleContent"
            placeholder="Mój artykuł przedstawia..."
          />
        </p>
        <p className={styles.cmsWrapper__editor__row}>
          <label
            className={styles.cmsWrapper__editor__row__label}
            htmlFor="articleBannerUrl"
          >
            Źródło baneru:
          </label>
          <input
            className={styles.cmsWrapper__editor__row__input}
            id="articleBannerUrl"
            type="url"
            placeholder="https://i.imgur.com/7nLm7si.mp4"
          />
        </p>
      </form>
    </div>
  );
};

export default CMS;
