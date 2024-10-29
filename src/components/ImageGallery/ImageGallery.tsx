import styles from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../App/App.types";

interface ImageGalleryProps {
    images: Image[]; 
    handleOpenModal: (image: Image) => void; 
}

export default function ImageGallery ({ images, handleOpenModal }: ImageGalleryProps) {
    return (
        <ul className={styles.galleryList}>
          {images.map((image) => (
            <li key={image.id} className={styles.galleryItem}>
              <ImageCard
                handleOpenModal={handleOpenModal} 
                image={image}
              />
            </li>
          ))}
        </ul>
    );
};