import styles from './Table.module.scss';

interface TableProps {
  children: React.ReactNode;
  page: number;
  pages: number;
  handleReads: (page: number) => Promise<void>;
}

const Table = ({ children, handleReads, page, pages }: TableProps) => {
  const getPages = () => {
    const array = Array.from({ length: pages }, (_, index) => index + 1);
    return array.map((number, index) => (
      <button
        onClick={() => {
          handleReads(number);
        }}
        disabled={page === number}
        key={index}
      >
        {number}
      </button>
    ));
  };

  return (
    <section className={styles.table}>
      <div className={styles.table__content}>{children}</div>
      <div className={styles.table__controls}>
        <button onClick={() => handleReads(1)}>Odśwież</button>
        {getPages()}
      </div>
    </section>
  );
};

export default Table;
