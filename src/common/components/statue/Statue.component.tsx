import styles from './Statue.module.scss';

const StatueDocument = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Regulamin serwisu</h1>
      <h2>Spis treści</h2>
      <p>Należy kliknąć w hiperłącze, aby otworzyć powiązany dokument</p>
      <section>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/przetwarzanie-danych-osobowych.pdf"
            >
              Przetwarzanie danych osobowych
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/polityka-prywatnosci-i-cookies.pdf"
            >
              Polityka prywatności i cookies
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/klauzula-informacyjna-RODO.pdf"
            >
              Klauzula informacyjna RODO
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/regulamin-serwisu.pdf"
            >
              Regulamin serwisu
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h3>
          W celu jakichkolwiek pytań chętnie udzielimy odpowiedzi przez kontakt
          mailowy
        </h3>
        <p>Należy kliknąć w hiperłącze, lub przepisać dany adres </p>
        <ul>
          <li>
            <a href="mailto:kontakt@fundacjaperyskop.org">
              kontakt@fundacjaperyskop.org
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default StatueDocument;
