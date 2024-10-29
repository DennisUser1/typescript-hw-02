import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
    handleMoreClick: () => void; 
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleMoreClick }) => {
  return (
    <button onClick={handleMoreClick} className={styles.btnShowMore}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;