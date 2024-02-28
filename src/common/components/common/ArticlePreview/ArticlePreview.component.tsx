import ArticlePage from '../../przydatneMaterialy/ArticlePage/ArticlePage.component';
import { Article } from '../../przydatneMaterialy/lib/getArticles';
import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
  article: Article;
  open: boolean;
  handleClose: () => void;
}

const ArticlePreview = ({
  article,
  open,
  handleClose,
}: ArticlePreviewProps) => {
  return (
    <dialog className={styles.dialog} open={open}>
      <button className={styles.dialog__closeButton} onClick={handleClose}>
        Zamknij podgląd
      </button>
      <ArticlePage preview={article} id={0} />
    </dialog>
  );
};

export default ArticlePreview;
