import styles from "./ImageCard.module.css";
import { Image } from "../App/App.types"; 

interface ImageCardProps {
    image: Image; 
    handleOpenModal: (image: Image) => void; 
}

export default function ImageCard ({ image, handleOpenModal }: ImageCardProps) {
    return (
        <div className={styles.imageWrapper} onClick={() => handleOpenModal(image)}>
            <img
              className={styles.image}
              src={image.urls.small}
              alt={image.alt_description}
            />
        </div>
    );
};